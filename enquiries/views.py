from django.contrib import messages
from django.shortcuts import render

from .models import ContactEnquiry, FranchiseEnquiry


def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        phone = request.POST.get('phone', '').strip()
        subject = request.POST.get('subject', '').strip()
        message_text = request.POST.get('message', '').strip()

        if name and email and phone and subject and message_text:
            ContactEnquiry.objects.create(
                name=name,
                email=email,
                phone=phone,
                subject=subject,
                message=message_text,
            )
            messages.success(
                request,
                'Thank you for your message! We will get back to you soon.'
            )
        else:
            messages.error(request, 'Please fill in all required fields.')

    return render(request, 'core/contact.html')


def franchise(request):
    if request.method == 'POST':
        full_name = request.POST.get('full_name', '').strip()
        email = request.POST.get('email', '').strip()
        phone = request.POST.get('phone', '').strip()
        city = request.POST.get('city', '').strip()
        state = request.POST.get('state', '').strip()
        preferred_location = request.POST.get('preferred_location', '').strip()
        message_text = request.POST.get('message', '').strip()

        if full_name and email and phone and city and state:
            FranchiseEnquiry.objects.create(
                full_name=full_name,
                email=email,
                phone=phone,
                city=city,
                state=state,
                preferred_location=preferred_location,
                message=message_text,
            )
            messages.success(
                request,
                'Thank you for your franchise enquiry! Our team will contact you shortly.'
            )
        else:
            messages.error(request, 'Please fill in all required fields.')

    return render(request, 'core/franchise.html')
