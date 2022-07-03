from django.db import models
from accounts.models import UserAccount

class Post(models.Model):
    author= models.ForeignKey(UserAccount, on_delete= models.DO_NOTHING, related_name="author")
    title= models.CharField(max_length= 1000, unique= True)
    body= models.TextField()
    date_posted= models.DateTimeField(auto_now_add= True)

    class Meta:
        verbose_name= "Post"
        verbose_name_plural= "Posts"
        ordering= ['-date_posted']

    def __str__(self):
        return self.title

    def get_profile(self):
        return self.author.profile.thumbnail.url
