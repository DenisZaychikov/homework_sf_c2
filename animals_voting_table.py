import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

ANIMALS = ['cats', 'parrots', 'dogs']
VOTES_NUM = 0
DB_PATH = 'sqlite:///my_db.sqlite3'
Base = declarative_base()


class VoteBase(Base):
    __tablename__ = 'voting'

    id = sa.Column(sa.Integer, primary_key=True)
    animal = sa.Column(sa.Text)
    votes_number = sa.Column(sa.Integer)


def connect_db():
    engine = sa.create_engine(DB_PATH)
    Base.metadata.create_all(engine)
    session = sessionmaker(engine)

    return session()


def create_table(animals, votes):
    for animal in animals:
        new_animal = VoteBase(animal=animal, votes_number=votes)
        session.add(new_animal)
    session.commit()

def get_info_from_db(animal):
    session = connect_db()
    res = session.query(VoteBase).filter(VoteBase.animal == animal).first()
    res.votes_number += 1
    session.add(res)
    session.commit()
    
    return res.votes_number

if __name__ == "__main__":
    session = connect_db()
    create_table(ANIMALS, VOTES_NUM)
