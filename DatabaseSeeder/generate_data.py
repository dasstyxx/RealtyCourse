import argparse
import datetime
import glob
import os.path
import random
import string

from PIL import Image
from faker import Faker
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from models import House, Apartment


parser = argparse.ArgumentParser(description='Seed data to RealtyCourse MS SQL database')
parser.add_argument('conn_string', type=str, help='Connection string in sqlalchemy "mssql+pyodbc://" format')
parser.add_argument('output_path', type=str, help='Output dir for images')
args = parser.parse_args()

connection_string = args.conn_string
images_output_path = args.output_path

apartment_images = glob.glob(r"images\apartments\*.jpg")
houses_images = glob.glob(r"images\houses\*.jpg")

watermark_scale_divider = 3
watermark_margin = 10
watermark = Image.open(r"images\logo.png")
watermark = watermark.resize((watermark.width // watermark_scale_divider, watermark.height // watermark_scale_divider))

apartments_count = len(apartment_images)
houses_count = len(houses_images)

db = create_engine(
    connection_string,
    echo=True)
session = Session(db)

fake = Faker('ru_RU')


def process_image(img, path_postfix):
    water_size = watermark.size
    img.paste(watermark,
              (img.width - water_size[0] - watermark_margin,
               img.height - water_size[1] - watermark_margin),
              watermark)

    image_name = "".join(random.choices(string.ascii_uppercase + string.digits, k=10))
    save_path = os.path.join(images_output_path, path_postfix, image_name + ".jpg")
    img.save(save_path, "JPEG", quality=80, optimize=True, progressive=True)
    return image_name


def random_date():
    return datetime.datetime.today() - datetime.timedelta(days=fake.random.randint(1, 360))


houses = []
for i in range(houses_count):
    image = Image.open(fake.random.choice(houses_images))
    image_name = process_image(image, "houses")

    house = House(
        CreationDateTime=random_date(),
        ImageName=image_name,
        Address=fake.address(),
        MaxFloor=fake.random.randint(1, 12),
        BuildYear=fake.random.randint(1960, 2022),
        WallMaterial=fake.random.choice(["brick", "concrete panel", "mix concrete"])
    )
    houses.append(house)
    session.add(house)

for i in range(apartments_count):
    image = Image.open(fake.random.choice(apartment_images))
    image_name = process_image(image, "apartments")

    apartment = Apartment(
        CreationDateTime=random_date(),
        ImageName=image_name,
        House=fake.random.choice(houses),
        Floor=fake.random.randint(1, 12),
        Price=float(fake.random.randint(int(1E6), int(1E7))),
        RoomAmount=fake.random.randint(1, 5),
        LivingSquare=float(fake.random.randint(8, 60))
    )
    session.add(apartment)

session.commit()
