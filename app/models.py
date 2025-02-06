from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=200)
    start_date = models.DateField()
    responsible = models.ForeignKey(User, on_delete=models.CASCADE)
    week_number = models.CharField(max_length=2, blank=True)
    end_date = models.DateField()

    def __str__(self):
        return str(self.name)

    def save(self, *args, **kwargs):
        print(self.start_date.isocalendar()[1])
        if self.week_number == "":
            self.week_number = self.start_date.isocalendar()[1]
        super().save(*args, **kwargs)
        
class Watchlist(models.Model):
    stock_ticker = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.stock_ticker

from django.utils.timezone import now

class Forum(models.Model):
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Message(models.Model):
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='messages')
    user = models.CharField(max_length=50)  # Username (For now, no authentication)
    content = models.TextField()
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)  # Replies
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user}: {self.content[:30]}"