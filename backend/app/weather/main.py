import requests
import os
import json

API_KEY = os.environ['OPENWEATHER_KEY']

# Weather Messages
thunderstorm_message = "It looks like there will be thunderstorms today. Try to stay inside, but if you have to be " \
                       "outside, bring an umbrella. Stay Safe!"
drizzle_message = "It looks like it's going to drizzle today! Think about wearing a raincoat or bring an umbrella " \
                  "where ever you go!"
rain_message = "Rain is in the forecast today! Make sure to dust off your umbrella today if you don't want to get too " \
               "wet!"
snow_message = "Someone put a spoon under their pillow last night! Get ready for some snow today, and be careful on " \
               "the roads. Thing about wearing boots and a jacket when you go outside."
clear_message = "It looks to be a clear one today, so you know what that means: suns out guns out! Think about some " \
                "sunscreen if you don't want to get burnt, and spend some time outside in the sun if it's warm enough!"
clouds_message = "There looks to be some gray in the forecast today. Nothing too exciting falling out of the sky, " \
                 "but that can be a good thing."
atmospheric_message = "There is {} outside. Be careful where you go, and watch your phone for updated weather alerts."

# Temperature
zero = "Brrrrrr, it's going to be very cold today, make sure to wear plenty of layers!"
twenty = "Whew, it's going to be cold one out there today. While it could be worse, I still recommend a few layers. " \
         "Think about covering up those ears and fingers, and make sure to wear a warm jacket!"
forty = "You feel that? It's a chilly one out there today. Make sure to wear a few layers, but you probably don't " \
        "have to go overboard. A sweater and jacket will probably be enough."
sixty = "Some call it warm, some call it cold. Honestly, I think today's temperature is 'just right'. Think about " \
        "wearing a sweatshirt and pants."
eighty = "Dress light today, it's a warm one. If the sun is out, you probably won't need a sweater."
hundred = "Wow, it's hot out there today. Definitely dress light, trust me, if you spend too much time outside you " \
          "will be sweating."
above = "Nope. Too hot out there today. Stay inside if possible, and if you go outside keep your clothes light. Make " \
        "sure you bring water wherever you go to stay hydrated."


def get_weather_message(lat, lon):
    weather_response = requests.get(
        f'https://api.openweathermap.org/data/2.5/onecall?'
        f'lat={lat}&lon={lon}&exclude=current,minutely,hourly,alert&units=imperial&appid={API_KEY}'
    )
    data = json.loads(weather_response.content)

    daily = data['daily'][0]
    temp = daily['temp']['day']
    weather_id = daily['weather'][0]['id']
    weather_main = daily['weather'][0]['main']

    weather_message = ''
    temp_message = ''

    if weather_main == 'Thunderstorm':
        weather_message = thunderstorm_message
    elif weather_main == 'Drizzle':
        weather_message = drizzle_message
    elif weather_main == 'Rain':
        weather_message = rain_message
    elif weather_main == 'Snow':
        weather_message = snow_message
    elif weather_main == 'Clear':
        weather_message = clear_message
    elif weather_main == 'Clouds':
        weather_message = clouds_message
    elif 701 <= weather_id <= 781:
        weather_message = atmospheric_message.format(weather_main.lower())

    if temp < 0:
        temp_message = zero
    elif 0 <= temp < 20:
        temp_message = twenty
    elif 20 <= temp < 40:
        temp_message = forty
    elif 40 <= temp < 60:
        temp_message = sixty
    elif 60 <= temp < 80:
        temp_message = eighty
    elif 80 <= temp < 100:
        temp_message = hundred
    elif 100 <= temp:
        temp_message = above

    return temp_message + ' ' + weather_message
