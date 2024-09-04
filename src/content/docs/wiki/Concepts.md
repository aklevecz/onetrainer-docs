---
title: Concepts
description: Learn about the Concepts tab in OneTrainer, where you can define and manage your training data inputs, including train data, regularization data, and more.
---
Update WIP

The Concepts tab is where you tell OneTrainer where your inputs are. Concepts can be your train data, regularization data or any other data you want to train on.


# Concepts Tab UI Overview
![image](https://github.com/Nerogar/OneTrainer/assets/132208482/2d02d53d-3937-444e-9b6a-9c8930924f57)

The Concepts tab is made up of the following elements:
* Dropdown menu (default: concepts)
You can setup multiple configs for your concepts, and the dropdown is how you select them. OneTrainer only trains from the current selected config.
* Add config
Pressing this button will bring up an UI element to ask for a name to create a new concepts config
* Add concept
Pressing this button will create a new default blank concept in the current config
* Delete concept (red X)
Pressing this button on a concept will delete it from the config
* Duplicate concept (green plus)
Pressing this button will duplicate this concept, including all settings
* Enable concept (toggle, default: on)
This sliding toggle will tell OneTrainer to train using this concept or not. The toggle is blue when enabled.
* Edit concept
Clicking on any part of the concept image, outside of the buttons and toggles, will open the concept settings window. This is a separate window where all the rest of the concept settings can be modified, and is the next part of this wiki section.

# Concepts Settings - General
![image](https://github.com/Nerogar/OneTrainer/assets/132208482/b2853b89-2c82-4de5-8642-330302bee080)

The general tab of the Concept focuses on the basic info, balancing and caching settings.
* Name (Default: Blank)
This field allows you to enter a name for your concept.  If you do not choose a name, it will default to the folder name you enter when you close the window.
* Enabled (Default: True)
A toggle that will mirror the toggle on the tab itself. This toggle controls if OneTrainer will train on this data or not.
* Path (Default: Blank)
This field will allow you to type or paste the path the location to your concept images. You can also the button next to the field (...) to browse for the folder instead.
* Prompt Source (Default: from text file per sample)
This dropdown has three options.
1. From text file per sample - `0001.jpg` will use `0001.txt` file as the prompt. Note you can add multiple captions, one per line in the txt file, it will randomly choose one for each epoch.
2. From single text file - the text file in the field to the right of the dropdown will be used for all images
3. From image file name - `tag1 tag2 tag3.jpg` will use tag1 tag2 tag3 as the prompt

* Include Subdirectories (Default: False)
This toggle will allow you to use subdirectories for ease of your use, but have OneTrainer treat them as one concept for internal management
* Image Variations (Default: 1)
This field controls how many images will be cached using the variables from the image augmentation tab. It is required when using image augmentations and latent caching, there is no best number but keep in mind that it will multiply the number of images cached.
* Text Variations (Default: 1)
This field controls how many prompts will be cached for each image. Note: If you are training the text encoder (or embeddings/additional embeddings), prompts are not cached and this setting does not need to be changed.
* Balancing (Default: 1 Repeats)
These two fields control the balancing for the concept. Balancing allows you to, as the name suggests, balance out one concept amongst others. One use case for this is regularization images. If you have 100 source images, but have 10,000 reg images, you can use balancing to train only a fraction of the images every epoch. There are two ways to use this setting.
  * Repeats - Your source images times the value will be used every epoch. For example, if you have 10,000 images and use .01, 100 images will be used every epoch.
  * Sample - Explicitly tells OneTrainer how many images to use each epoch. For example. Using 100 samples will always use 100 images per epoch. This is true if you have 10,000 images or 20.
* Loss Weight (Default: 1)
Another technique to balance your inputs. One use case for this is using a value less than 1 for reg images if you find they are affecting the training run more than you would like.

# Image Augmentation Tab
![image](https://github.com/Nerogar/OneTrainer/assets/132208482/66d59e79-39d1-4740-b1e4-862162636d4d)

This tab focuses on image augmentation to help diversify your image set. This tends to become more important as your input size becomes smaller. Most image augmentation options have both an option to be random or fixed. Random will choose a value up to the number entered, fixed will use it. It is important to note, that using image augmentations either requires caching every epoch (turning latent caching off) or using image variations. For small datasets, this is not costly, but the more images you have the more time it will take to use image augmentations.
* Update Preview - Pressing this button will give you an idea of what your augmentations are doing. When using random augmentations, pressing the button multiple times will help give a better idea of what will happen.
* Crop Jitter (Default: On) - OneTrainer will try to pick the closest standard resolution bucket for your image, but if OneTrainer needs to crop your image, and this option is selected, it will perform a non center crop randomly to allow the image to be different.
* Random Flip (Default: On) - The image will be flipped, mirrored about the vertical midpoint. Can be fixed (always) or random
* Random Rotation (Default: Off - 0) - The image will be rotated. Randomly, it will rotate either direction up to the number specified in degrees. Fixed, it will always rotate to the number specified in degrees.
* Random Brightness (Default: Off - 0) - The brightness of the image will be changed.  When using random, it will change up and down with the value specified being a cap. When using fixed, it will change by the number specified.  
* Random Contrast (Default: Off - 0) - The contrast of the image will be changed. When using random, it will change up and down with the value specified being a cap. When using fixed, it will change by the number specified.  
* Random Saturation (Default: Off - 0) - The saturation of the image will be changed. When using random, it will change up and down with the value specified being a cap. When using fixed, it will change by the number specified.  
* Random Hue (Default: Off - 0) - The hue (color) of the image will be changed. When using random, it will change up and down with the value specified being a cap. When using fixed, it will change by the number specified.  
* Resolution Override (Default: Off - 512) - This feature can be used to override the training resolution of the concept. When disabled, One Trainer rescale the images to your training resolution(s).
  * When activated, it can be used for two purposes:
    * With [multi resolution training](https://github.com/Nerogar/OneTrainer/wiki/Lessons-Learnt-and-Tutorials#multi-resolution-training) (several training resolutions separated by a comma), it will use images from the concept of the same resolution.
    * To prevent image upscaling, you can train at 1024 (target resolution) with images of 512 or 256 that won't get upscaled. Training will be done at 512 or 256. It can help with low quality images.

# Text Augmentation Tab
<img width="592" alt="textaug" src="https://github.com/user-attachments/assets/cf7b14e6-0823-4f31-a4d4-d5d413255271">

This tab is intended for Tag shuffling. The Keep tag count defines the number of tags starting from the left that won't be shuffled. There can be only one tag delimiter (default comma).


# Original Concepts Wiki Data
**That's the place to put your data set.**

For a single run you can simply add concepts and edit them with a link to your dataset (with or without captions) then select the prompt source (single text file if you don't use any caption, from text file per sample if you set text files for the caption or from image name it you put the caption in the image name).
When working on multiple runs and subject to train, you can create a configuration (config) and add concept(s) to it. You'll be able to call it again later.

Note for embedding and additional embeddings, you need to include the embedding placeholder (defaulted to `<embedding>`) in the caption, it can be `<embedding>` or any other word(s) you want. Either in the image caption or in the single text file. Yes, it can be several words separated by spaces, so with a caption like "Blurry photograph of a man wearing a military suit", you could use 'Blurry photograph", "man" and "military suit" as placeholders for 3 embeddings.

**Concept options.**

You can use the default settings or enable image variations to enhance the training quality.

Each concept has four options:

* Image variations: Specifies the number of differently cached image versions of a concept.
* Text variations: The same for the text. This only applies if the text encoder is not trained.
* Balancing: With this option you can adjust the number of images of a concept that are included in each epoch. Either use Repeats as a multiplier of the concept (it can be less than 1) or Samples to specify the exact number of images used per epoch (it can be higher than the number of images in the concept).
* Loss Weight: This is a multiplier for the loss for this concept.

Here is an example:

* Concept A: 10 images, 10 image variations, 5.0 repeats
* Concept B: 100 images, 2 image variations, 1.0 repeats
* Concept C: 5000 images, 1 image variations, 0.1 repeats

Concept A will be cached 10 times, concept B twice, and concept C only once. This is similar to the latent caching epochs, but adjustable for each concept. The latent caching epochs have been removed.
Each epoch is trained on 50 images from concept A, 100 images from concept B, and 500 images from concept C.


Some additional remarks:
* Resolution override for each concept. You can set the resolution individually for each concept.
* Fixed image augmentations: instead of using random numbers, you can specify fixed values for image augmentations.
* Enabling or disabling of concepts. Each concept can be disabled individually.
* You can now add single concepts to the training run without caching the entire dataset again. Only the new concept will be cached.
* Loss weight for each concept. This can be useful for things like regularization images that should not be trained as regular training images.
* Text Variations can be either tag shuffle (see option) or multi-line caption files. As noted, this is required when not training the text encoder.

