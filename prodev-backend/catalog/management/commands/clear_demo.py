from django.core.management.base import BaseCommand
from catalog.models import Product

class Command(BaseCommand):
    help = "Delete all demo products (keeps categories)"

    def handle(self, *args, **kwargs):
        deleted, _ = Product.objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f"Deleted {deleted} product rows."))
