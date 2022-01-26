from rest_framework import serializers
from .models import Book, Issued

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class IssuedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issued
        fields = '__all__'