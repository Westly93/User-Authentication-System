from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


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