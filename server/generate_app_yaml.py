#!/usr/bin/python3
import argparse
import os
import yaml

def generate_yaml(input_file, output_file):
    with open(input_file, "r") as f:
        data = yaml.safe_load(f)

    env_variables = data['env_variables']
    for env_variable in env_variables:
        data['env_variables'][env_variable] = os.environ[env_variable]

    with open(output_file, "w") as f:
        yaml.dump(data, f)

parser = argparse.ArgumentParser(description='Replace environment variables with valid ones')
parser.add_argument('input_file', type=str, help='input yaml template')
parser.add_argument('output_file', type=str, help='output yaml file')

args = parser.parse_args()
generate_yaml(args.input_file, args.output_file)
