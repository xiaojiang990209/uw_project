#!/usr/bin/env python
# coding: utf8
"""Example of training spaCy's named entity recognizer, starting off with an
existing model or a blank model.

For more details, see the documentation:
* Training: https://spacy.io/usage/training
* NER: https://spacy.io/usage/linguistic-features#named-entities

Compatible with: spaCy v2.0.0+
Last tested with: v2.1.0
"""
from __future__ import unicode_literals, print_function

import plac
import random
from pathlib import Path
import spacy
from spacy.util import minibatch, compounding

SOURCE_LABEL = 'SRC'
DEST_LABEL = 'DEST'

TRAIN_DATA = [
  ("Driving From Cambridge Kitchener to Pearson Airport today Sat Mar 7 at 5 am morning Please msg for spot ",{"entities": [(13,32, SOURCE_LABEL), (36,51,DEST_LABEL)]}),
  ("Driving Plaza to North York tomorrow Sat 1045am 11am",{"entities": [(8,13,SOURCE_LABEL),(17,27,DEST_LABEL)]}),
  ("Ride Offer Today Sat March 7th Toronto to Waterloo 10am Waterloo to Toronto 11:45am",{"entities": [(31,38,SOURCE_LABEL),(43,51,DEST_LABEL)]}),
  ("Looking for a ride from Waterloo  to Pearson airport for tomorrow Saturday around 1 30pm Ps i have a suitcase",{"entities": [(24,32,SOURCE_LABEL),(37,52,DEST_LABEL)]}),
  ("Looking for a ride from Waterloo to Fairview Fmp Pmall after 1pm Saturday March 7th ",{"entities": [(24,32,SOURCE_LABEL),(37,55,DEST_LABEL)]}),
  ("Driving on March 7 Sat around 7 pm Waterloo  Plaza to Richmond Hill Markham Msg me if you need a ride",{"entities": [(35,53,SOURCE_LABEL),(54,75,DEST_LABEL)]}),
  ("Driving STC Yorkdale to Waterloo  Plaza Friday March 6th 9pm $20",{"entities": [(8,20,SOURCE_LABEL),(24,39,DEST_LABEL)]}),
  ("Looking for 1 spot from Waterloo  to North York Scarborough tonight after 8 ",{"entities": [(24,32,SOURCE_LABEL),(37,59,DEST_LABEL)]}),
  ("Driving from Waterloo  to YYZ Mississauga Downtown at 1 30 pm March 07th DM for details ",{"entities": [(13,21,SOURCE_LABEL),(26,50,DEST_LABEL)]}),
  ("driving from Toronto  to Plaza today", {"entities": [(13,20,SOURCE_LABEL),(25,30,DEST_LABEL)]})
]

TEST_DATA = [
  'Waterloo to Yorkdale STC 3pm',
'Driving Waterloo to Toronto 10am',
'driving from Toronto  to Plaza today',
'Need a ride from Downtown Toronto to Waterloo  before 2:30 pm please dm'


]

@plac.annotations(
    model=("Model name. Defaults to blank 'en' model.", "option", "m", str),
    output_dir=("Optional output directory", "option", "o", Path),
    n_iter=("Number of training iterations", "option", "n", int),
)
def main(model=None, output_dir=None, n_iter=100):
    """Load the model, set up the pipeline and train the entity recognizer."""
    if model is not None:
        nlp = spacy.load(model)  # load existing spaCy model
        print("Loaded model '%s'" % model)
    else:
        nlp = spacy.blank("en")  # create blank Language class
        print("Created blank 'en' model")

    # create the built-in pipeline components and add them to the pipeline
    # nlp.create_pipe works for built-ins that are registered with spaCy
    if "ner" not in nlp.pipe_names:
        ner = nlp.create_pipe("ner")
        nlp.add_pipe(ner, last=True)
    # otherwise, get it so we can add labels
    else:
        ner = nlp.get_pipe("ner")

    # add labels
    for _, annotations in TRAIN_DATA:
        for ent in annotations.get("entities"):
            ner.add_label(ent[2])

    # get names of other pipes to disable them during training
    pipe_exceptions = ["ner", "trf_wordpiecer", "trf_tok2vec"]
    other_pipes = [pipe for pipe in nlp.pipe_names if pipe not in pipe_exceptions]
    with nlp.disable_pipes(*other_pipes):  # only train NER
        # reset and initialize the weights randomly – but only if we're
        # training a new model
        if model is None:
            nlp.begin_training()
        for itn in range(n_iter):
            random.shuffle(TRAIN_DATA)
            losses = {}
            # batch up the examples using spaCy's minibatch
            batches = minibatch(TRAIN_DATA, size=compounding(4.0, 32.0, 1.001))
            for batch in batches:
                texts, annotations = zip(*batch)
                nlp.update(
                    texts,  # batch of texts
                    annotations,  # batch of annotations
                    drop=0.5,  # dropout - make it harder to memorise data
                    losses=losses,
                )
            print("Losses", losses)

    # test the trained model
    for text in TEST_DATA:
        doc = nlp(text)
        print("Entities", [(ent.text, ent.label_) for ent in doc.ents])
        print("Tokens", [(t.text, t.ent_type_, t.ent_iob) for t in doc])

    # save model to output directory
    if output_dir is not None:
        output_dir = Path(output_dir)
        if not output_dir.exists():
            output_dir.mkdir()
        nlp.to_disk(output_dir)
        print("Saved model to", output_dir)

        # test the saved model
        print("Loading from", output_dir)
        nlp2 = spacy.load(output_dir)
        for text, _ in TRAIN_DATA:
            doc = nlp2(text)
            print("Entities", [(ent.text, ent.label_) for ent in doc.ents])
            print("Tokens", [(t.text, t.ent_type_, t.ent_iob) for t in doc])


if __name__ == "__main__":
    plac.call(main)

    # Expected output:
    # Entities [('Shaka Khan', 'PERSON')]
    # Tokens [('Who', '', 2), ('is', '', 2), ('Shaka', 'PERSON', 3),
    # ('Khan', 'PERSON', 1), ('?', '', 2)]
    # Entities [('London', 'LOC'), ('Berlin', 'LOC')]
    # Tokens [('I', '', 2), ('like', '', 2), ('London', 'LOC', 3),
    # ('and', '', 2), ('Berlin', 'LOC', 3), ('.', '', 2)]