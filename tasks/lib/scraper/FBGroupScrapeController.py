"""
1. Controller gets request of the form
{
    group_id: 'abcd',
    type: Carpool/Housing
    location: Waterloo/Toronto


2. Controller delegates this to FBGroupScraper(group_id, num_posts=500) by:
    FBGroupScraper().get_result(group_id, 500)

3. FBGroupScraper starts scraping, returns top 500 results
    Handles logic of extracting information and handling next_page_urls

4. Controller receives the result as JSONArray, delegates to FBGroupRepository to update the results
    FBGroupRepository().save(group_id, type, result)

5. FBGroupRepository saves result, updates the collections



"""
