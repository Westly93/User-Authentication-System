from rest_framework import serializers
from posts.models import Post



class PostSerializer(serializers.ModelSerializer):
    thumbnail= serializers.SerializerMethodField()
    class Meta:
        model=Post
        fields= "__all__"
        depth= 2 
    def get_thumbnail(self,obj):
        return obj.get_profile()