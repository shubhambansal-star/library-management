from django.urls import path, include
from books.views import AdminResourceAPIView, AdminGetListView
from .models import Book, Issued
from .serializers import BookSerializer, IssuedSerializer
urlpatterns = [
    path('book/<int:pk>', AdminResourceAPIView.as_view(
        model = Book,
        resource_serializer = BookSerializer
    )),
    path('issued/<int:pk>', AdminResourceAPIView.as_view(
        model = Issued,
        resource_serializer = IssuedSerializer
    )),
    path('issued-list/<str:page>', AdminGetListView.as_view(
        model = Issued,
        resource_serializer = IssuedSerializer
    )),
    path('book-list/<str:page>', AdminGetListView.as_view(
        model = Book,
        resource_serializer = BookSerializer
    ))
]