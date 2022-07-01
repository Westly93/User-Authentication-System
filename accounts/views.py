from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ProfileSerializer
from .models import Profile

class ProfileView(APIView):
    parser_classes= [FormParser, MultiPartParser, JSONParser]
    def get(self, request, *args, **kwargs):
        user= request.user
        profile= Profile.objects.get(user=user)
        serializer= ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        user= request.user
        profile= Profile.objects.get(user=user)
        print(request.data)
        serializer= ProfileSerializer(instance= profile, data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response({"message":"Ooops failed to update your profile something went wrong!!"})

    