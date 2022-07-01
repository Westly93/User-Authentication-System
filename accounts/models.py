from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.dispatch import receiver
from django.db.models.signals import post_save
from django_resized import ResizedImageField


class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password= None):
        if not email:
            raise ValueError("Users must have an email")
        if not password:
            raise ValueError("Users must have a password")
        if not name:
            raise ValueError("Users must at least have a name ")

        email= self.normalize_email(email)
        user= self.model(email=email, name=name)
        user.set_password(password)
        user.save()
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email= models.EmailField(max_length= 255, unique= True)
    name= models.CharField(max_length= 255)
    is_active= models.BooleanField(default= True)
    is_staff= models.BooleanField(default= False)

    objects= UserAccountManager()

    USERNAME_FIELD= 'email'
    REQUIRED_FIELDS= ['name']
    def get_fullname(self):
        return self.name

    def get_shortname(self):
        return self.name

    def __str__(self):
        return self.email

class Profile(models.Model):
    bio= models.TextField(null=True, blank=True)
    user= models.OneToOneField(UserAccount, on_delete= models.CASCADE, related_name= "profile")
    address= models.CharField(max_length= 1000, null=True, blank=True)
    thumbnail= ResizedImageField(size= [200, 200], quality= 100, upload_to= "authSystem", 
        default= 'default.jpg')

    class Meta:
        verbose_name= "Profile"
        verbose_name_plural= "Profiles"

    def __str__(self):
        return f"{self.user.name}'s Profile"

@receiver(post_save, sender= UserAccount)
def create_profile(sender, created, instance, *args, **kwargs):
    if created:
        Profile.objects.create(user= instance)

@receiver(post_save, sender= UserAccount)
def save_profile(sender, instance, *args, **kwargs):
    instance.profile.save()