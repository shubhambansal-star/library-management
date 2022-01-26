from django.contrib import admin
from .models import Book, Issued
# Register your models here.

admin.site.register(Book)
admin.site.register(Issued)
