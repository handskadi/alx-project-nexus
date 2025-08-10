from django.core.management.base import BaseCommand
from django.db import transaction
from decimal import Decimal
import random

from catalog.models import Category, Product

CATEGORIES = ["Electronics", "Fashion", "Home", "Sports"]

IMG_POOL = [
    "https://placehold.co/600x450/png?text=Product",
    "https://picsum.photos/seed/a/600/450.jpg",
    "https://picsum.photos/seed/b/600/450.jpg",
    "https://picsum.photos/seed/c/600/450.jpg",
    "https://picsum.photos/seed/d/600/450.jpg",
]

class Command(BaseCommand):
    help = "Seed demo categories and products for MK E‑Shop"

    def add_arguments(self, parser):
        parser.add_argument(
            "--count",
            type=int,
            default=120,
            help="Number of products to create (default: 120)",
        )
        parser.add_argument(
            "--wipe",
            action="store_true",
            help="Delete all existing products before seeding",
        )

    @transaction.atomic
    def handle(self, *args, **opts):
        count = int(opts["count"])
        wipe = bool(opts["wipe"])

        if wipe:
            self.stdout.write("Wiping existing products…")
            Product.objects.all().delete()

        # Ensure categories exist
        cat_objs = []
        for name in CATEGORIES:
            c, _ = Category.objects.get_or_create(name=name)
            cat_objs.append(c)

        created = 0
        for i in range(1, count + 1):
            c = cat_objs[i % len(cat_objs)]
            price = Decimal(f"{random.uniform(10, 220):.2f}")
            stock = random.randint(5, 200)
            img = IMG_POOL[i % len(IMG_POOL)]

            Product.objects.create(
                category=c,
                name=f"Sample Product {i}",
                description="Demo product seeded for MK E‑Shop.",
                price=price,
                stock=stock,
                image=img,
            )
            created += 1

        self.stdout.write(self.style.SUCCESS(f"Seed complete: {created} products, {len(cat_objs)} categories."))
