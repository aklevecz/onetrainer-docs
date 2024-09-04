---
title: Onboarding for newcomers
descrption: The basics for getting started with training for beginners
---
Welcome to OneTrainer!

OneTrainer is your all-in-one solution for training [diffusion models](https://en.wikipedia.org/wiki/Diffusion_model). Though the user interface (UI) looks simple, it can be deceptive. This guide provides a clear walkthrough to help you navigate the UI and set your training settings as a beginner.

Please note, this is not a comprehensive training guide. It focuses mostly on the perspective of trying to train a LoRA

## 1. Getting Started

In the top left, next to the "OneTrainer" logo, you'll find a blank dropdown list for 'configs' (presets). As a beginner, select the one you want to train.

![image](https://github.com/Nerogar/OneTrainer/assets/18110006/cb7e81a4-2316-492a-bd79-a3a9c957694a)

Below that, there's a tab bar with the active tab highlighted in blue. Click on the `general` tab.

![image](https://github.com/Nerogar/OneTrainer/assets/18110006/816303ac-b6ed-42e2-b941-3f0699b18ea7)


Define the filepath for the Workspace Directory and the Cache Directory if they aren't set already. For now, don't change any other settings on this page. If you have an RTX 4090, consider increasing the dataloader threads to 8 (be cautious, as setting this too high can cause VRAM issues).

## 2. Model tab
Navigate to the `model` tab and set the `Base model` with its full path, for example: C:\stable-diffusion-webui\models\Stable-diffusion\v1-5-pruned.safetensors.

Next, set the `Model Output Destination`. This will be the filename of your trained output, for example: C:\stable-diffusion-webui\models\Lora\Astronaut-riding-a-horse.safetensors.

The filename you set here will be used in A111/Comfy/Forge/Invoke to activate the LoRA. For example, in A111, you would enter `<Astronaut-riding-a-horse:1>`.

## 3. Data Tab
Navigate to the `data` tab, and ensure everything is toggled on (these should be on by default). As a beginner, you want all of these options enabled.

## 4. Concepts Tab (aka Dataset)
Prepare your dataset with images and captions, either as separate text files or in the image names. While captions are optional, they are recommended. 90% of the work is gathering quality, diverse images and creating high quality (and varied) captions.

You can also use the Tools tab to open your dataset and generate captions using auto captioners/taggers, but this is beyond the scope of this guide.

Once your dataset is ready, navigate to the `concepts` tab. Click on `add concept`, then click on the newly added item. This will open a new modal (window).

![image](https://github.com/Nerogar/OneTrainer/assets/18110006/90e1bfec-2683-4f57-8bd3-129d8224790c)

In `Path` provide the path to your dataset. In the `Prompt Source`, indicate how you captioned your images. As a beginner you should do img-txt file pairs, which is targeted by setting "From text file per sample" and creating the file pairs i.e `001.jpeg` & `001.txt`

For more information on concept options, check the dedicated [Concept](https://github.com/Nerogar/OneTrainer/wiki/Concepts) page.

## 5. Training
You may click on the `training` tab but we reccomend sticking with the default values for now. Check this [page](https://github.com/Nerogar/OneTrainer/wiki/Training) for more information

## 6. Samples and backup
Optional but useful. Sampling generates images using your currently-being-trained model, allowing you to visually observe its progress. As a beginner, you might not know what to look for yet.

For more information, check this [page](https://github.com/Nerogar/OneTrainer/wiki/Sampling-and-Backup).

## 7. Lora tab
Next click on the `LoRA` tab

`LoRA rank`: Leave it at the default value of 16 for SD1.5, for SDXL try 8 or 16, **bigger does not equal better**, larger ranks more easily overtrain.

Leave the `LoRA alpha` at whatever the default value of 1.0, it only multiplies the weights of the model. Whenever you modify it, you must also modify the Learning Rate.

## 8. Start Training !
Hit the big `Start Training` button, you can see the training progression bottom left or monitor it via the CLI or more indepth via clicking on the big `Tensorboard` button.

## 9. Test the LoRA in inference software 
Finally test the LoRA with inference software. Does it perform as you expect? Congraluations! If not, welcome to the world of diffusion. Its an interative process. Whilst extensive testing is beyond the scope of this guide here is a keyword to search for:

XYZ grid extension A111






