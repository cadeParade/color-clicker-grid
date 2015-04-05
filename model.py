from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import sessionmaker, scoped_session

engine = create_engine('postgresql://localhost/altschool_tiles')
session = scoped_session(sessionmaker(bind=engine, autocommit = False, autoflush = False))

Base = declarative_base()
Base.query = session.query_property()

class Boards(Base):
  __tablename__ = "boards"
  id = Column(Integer, primary_key = True)
  colors = Column(JSON)
