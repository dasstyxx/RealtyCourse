from sqlalchemy import Column, DateTime, Float, ForeignKey, Identity, Integer, Unicode
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class House(Base):
    __tablename__ = 'House'

    Id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CreationDateTime = Column(DateTime)
    Address = Column(Unicode)
    MaxFloor = Column(Integer)
    BuildYear = Column(Integer)
    WallMaterial = Column(Unicode(256))
    ImageName = Column(Unicode(256))

    Apartment = relationship('Apartment', back_populates='House')


class Apartment(Base):
    __tablename__ = 'Apartment'

    Id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    CreationDateTime = Column(DateTime)
    HouseId = Column(ForeignKey('House.Id'), index=True)
    Floor = Column(Integer)
    Price = Column(Float(53))
    RoomAmount = Column(Integer)
    LivingSquare = Column(Float(53))
    ImageName = Column(Unicode(256))

    House = relationship('House', back_populates='Apartment')
