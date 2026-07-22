
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns=[
    path('register/',views.register,name='register'),
    path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('products/',views.product_list,name="products"),
    path('products/<pk>/',views.get_product,name="product"),
    path('categories/',views.category_list,name="categories"),
    path('cart/',views.get_cart, name='get_cart'),
    path('cart/add/',views.add_to_cart, name='add_to_cart'),
    path('cart/remove/',views.remove_from_cart, name='remove_from_cart'),
    path('cart/update/', views.update_item_quantity, name='update_item_quantity'),
    path('orders/create/',views.create_order, name='create_order')


]