import requests
import response
import json

# Weather Messages
thunderstorm_message = """It looks like there will be thunderstorms today. Try to stay inside, but if you have to be 
outside, bring an umbrella. Stay Safe! """
drizzle_message = """It looks like it's going to drizzle today! Think about wearing a raincoat or bring an umbrella 
where ever you go!"""
rain_message = """Rain is in the forecast today! Make sure to dust off your umbrella today if you don't want to
get too wet!"""
snow_message = """Someone put a spoon under their pillow last night! Get ready for some snow today, and be careful 
on the roads. Thing about wearing boots and a jacket when you go outside."""
clear_message = """It looks to be a clear one today, so you know what that means: suns out guns out! Think about 
some sunscreen if you don't want to get burnt, and spend some time outside in the sun if it's warm enough!"""
clouds_message = """There looks to be some gray in the forecast today. Nothing too exciting falling out of the sky, 
but that can be a good thing"""

# Temperature Messages
below_zero_message = """Brrrrrrrrr. Don't go outside if you can help it, trust me, it's cold out there. If you are
going outside, make sure to wear plenty of layers!"""
zero_twenty_message = """Whew, it's a cold one out there. While it could be worse, I still recommend a few layers. 
Think about covering up those ears and fingers, and make sure to wear a warm jacket!"""
twenty_forty_message = """You feel that? It's a chilly one out there today. Make sure to wear a few layers, but you
probably don't have to go overboard. A sweater and jacket will probably be enough."""
forty_sixty_message = """Some call this warm, some call this cold. Honestly, I think this is 'just right'. Think 
wearing a sweatshirt and pants today."""
sixty_eighty_message = """Dress light today, it's a warm one. If the sun is out, you probably won't need a sweater."""
eighty_hundred_message = """Wow, it's hot out there today. Definitely dress light, trust me, if you spend too much 
time outside you will be sweating."""
above_hundred_message = """Nope. Too hot out there. Stay inside if possible, and if you go outside keep your clothes 
light. Make sure you bring water where ever you go to stay hydrated."""


def get_weather_message(response):
    data = response.json()
    report = data['weather']
    weather_main = report[1]
    if weather_main == 'Thunderstorm':
        return thunderstorm_message
    elif weather_main == 'Drizzle':
        return drizzle_message
    elif weather_main == 'Rain':
        return rain_message
    elif weather_main == 'Snow':
        return snow_message
    elif weather_main == 'Clear':
        return clear_message
    elif weather_main == 'Clouds':
        return clouds_message

    return "unknown weather: beware"


def get_temperature_message(response):
    data = response.json()
    main = data['main']
    temp = main[0]
    if temp < 0:
        return below_zero_message
    elif 0 <= temp & temp < 20:
        return zero_twenty_message
    elif 20 <= temp & temp < 40:
        return twenty_forty_message
    elif 40 <= temp & temp < 60:
        return forty_sixty_message
    elif 60 <= temp & temp < 80:
        return sixty_eighty_message
    elif 80 <= temp & temp < 100:
        return eighty_hundred_message
    elif 100 <= temp:
        return above_hundred_message

    return "unknown weather: beware"


def get_message(response):
    weather = get_weather_message(response)
    temperature = get_temperature_message(response)
    return weather + temperature
