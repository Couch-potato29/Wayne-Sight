# Wayne-Sight
### A Sign Language Detection Web App

Wayne sight is a web app which uses machine learning and computer vision,
to detect the sign made by a user and translate it to english.

Since this is my first machine learning project, I used a pretrained object detection model
and trained it on cutom images of upto 12 signs of the american sign language.

**The Java Script SpeechSynthesizer library is used to make the app speak the detected text**

An image labeller was used to draw the bounding box around each sign in every image.
The pretrained model of choice was the SSD MobileNet V2 FPNLite 320x320 as i found this model,
to have a good balance between speed and accuracy.
I have used Tensorflow 2.0 GPU to train the model on the custom images.

To make it a web application, the model was converted to a Tensorflow JS model
which is currently being served from this repository. This model is then imported into a react application.

### Problems Faced:
Intially, the app would detect letters of the english alphabet, but the main challenge was in detecting the
phrases which have signs that involve moving the hands and it is not a stationary sign.
This problem was solved by taking images of the position of the signs that were in the same position for a longer time.

### Current Problem:
The App takes around 3-4 seconds to display the detected sign.
