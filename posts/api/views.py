from posts.models import Post
from .serializers import PostSerializer
from rest_framework import viewsets
from rest_framework.response import Response 
from rest_framework.permissions import AllowAny


    
class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes= [AllowAny]

    def get_queryset(self):
        return Post.objects.all()

    def create(self, request):
        user= request.user
        data= request.data
        if user: 
            new_post= Post.objects.create(author= user, title=data['title'], body= data['body'])
            new_post.save()
            serializer= PostSerializer(new_post)
            return Response(serializer.data)
        return Response({"bad request": "You are not allowed to add new post"})
