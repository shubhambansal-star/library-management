from django.db import models
from users.models import User
# Create your models here.


class Book(models.Model):
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255,null=True,blank=True)
    categories = models.CharField(max_length=255)
    is_issued = models.BooleanField(default=False)

class Issued(models.Model):
    book = models.ForeignKey(Book, on_delete= models.SET_NULL, null=True)
    student = models.ForeignKey(User, on_delete = models.SET_NULL, null=True)
    issued_date = models.DateField()
    return_date = models.DateField()
