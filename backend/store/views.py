from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .models import Cart, CartItem, Category, Product,Order,OrderItem
from .serializers import CartItemSerializer, CartSerializer, ProductSerializer,CategorySerialzer, RegisterSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
 

@api_view(['GET'])
def product_list(request):
    product=Product.objects.all()
    serializer=ProductSerializer(product, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product(request, pk):
    
    try:
        product=Product.objects.get(id=pk)
        serializer=ProductSerializer(product, context={'request':request})
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error':'Product Not found'}, status=404)   

@api_view(['GET'])
def category_list(request):
    category=Category.objects.all()
    serializer=CategorySerialzer(category, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created=Cart.objects.get_or_create(user=request.user)
    serializer=CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id=request.data.get("product_id")
    product=Product.objects.get(id=product_id)

    cart, created=Cart.objects.get_or_create(user=request.user)
    item, created=CartItem.objects.get_or_create(cart=cart, product=product)

    if not created:
        item.quantity+=1
        item.save()
    return Response({'message':"Product added to cart",'cart':CartSerializer(cart).data})

@api_view(['POST'])
def update_item_quantity(request):
    item_id=request.data.get("item_id")
    quantity=request.data.get("quantity")

    if not item_id or quantity is None:
        return Response({'error':'Item ID and quantity are required'},status=400)
    
    try:
        item=CartItem.objects.get(id=item_id)
        if int(quantity)<1:
            item.delete()
            return Response({'error':'Qauntity must be atleast 1'},status=400)
        
        item.quantity=quantity
        item.save()
        serializer=CartItemSerializer(item)
        return Response(serializer.data)
    
    except CartItem.DoesNotExist:
        return Response({'error':'Cart item not found'},status=400)
        

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id=request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()
    
    return Response({'message':'item removed from cart'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        data=request.data

        name=data.get('name')
        address=data.get('address')
        phone=data.get('phone')
        payment_method=data.get('payment_method','COD')

        if not phone.isdigit() or len(phone)<10:
            return Response({'error':'invalid phone number'},status=400)
        

        cart, created=Cart.objects.get_or_create(user=request.user )

        if not cart or not cart.items.exists():
            return Response({'error':'Cart is empty'},status=400)
        
        total=sum(float(item.product.price)*item.quantity for item in cart.items.all())
        
        order=Order.objects.create(
            user=request.user,
            total_amount=total
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
            )
        cart.items.all().delete()

        return Response({
            'message':'Order placed successfully',
            'order_id':order.id
            })
    
    except Exception as e:
        return Response({"error":str(e)},status=500)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer=RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user=serializer.save()
        
        return Response({'message':'User Created Succesfully','user':UserSerializer(user).data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

    

