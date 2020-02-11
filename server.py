import json
from bottle import run, route, response, request
import animals_voting_table as db


@route('/sse/vote/cats', method='POST')
def voting_for_cats():
    animal = 'cats'
    response.headers['Access-Control-Allow-Origin'] = '*'
    
    votes = db.get_info_from_db(animal)
    return 'Hello'


run(
    server='waitress'
)

