---
title: Frequently Asked Questions
description: Get answers to common questions about training photo datasets, supported image types, setting trigger words, training embeddings, comparing embeddings to LoRAs, VRAM requirements, and using class pics/regularization images.
---
* Where can I put training photo dataset ?
> In the concepts tab. First add a config then add a concept to this config. When you click on the concept it open a window where you specify the path to your dataset. You can define several concepts for a config.

* What image types are supported ?
>  The full list of supported extensions: 
['.bmp', '.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp']

* Where can I put the trigger word ?
> The trigger word used in prompts for embeddings is simply the filename, none exist for LoRA.
> For embeddings and additional embeddings the captions must contain the placeholder or the images won't be trained.

* [Embedding] How shall I use the placeholder `<embedding>` when training embeddings and additional embeddings ?
> It's just a placeholder, you can use any word, before the additional embeddings option, it had to be strictly `<embedding>` but now you can use any word you want, it just need to match the trigger word set in your captions.

* [Embedding] How to set the initial embedding text ?
> In short, the initial embedding text should describe your subject but should not exceed in tokens the embedding token count.

> Here is an explanation. Let's take your example prompt of "photograph of `<embedding>` with", and (for simplicity) assume every word is encoded into a single token. This could result in the following token IDs: [1, 2, ..., 3], where "..." is the place your embedding is inserted. if you have a 3 token embedding, it would be for example [1, 2, 100, 101, 102, 3].

> Now let's say you set an init text of "blond woman wearing a pink hat". that's 6 tokens. but the embedding only supports 3 tokens, so only the first 3 (of the 6) tokens are actually used. the rest is truncated.

> This also goes the other way around. if you only supply a shorter text (like "blond woman"), it doesn't know what to use as the third token. in OneTrainer, tokens are padded with the " * " token, so "blond woman" becomes "blond woman *".

* Are embeddings comparable to LoRAs in terms of quality/flexibility?
> Embedding (Textual Inversion) works backward to find the tokens that matche your images, so it can only learn things that the base model already knows. For that reason they can be very flexible. They are good for persons because the model has seen a lot of different people already. But it can't learn something completely new.
They don't require many images, 15-30 images are plenty enough, even a minimalistic dataset (~ 6 images) can work.
Also note that they can be used with LoRAs.

> LoRA add a set of weights to the model. They are usually used for persons, style, poses and image composition. Depending on what you're training you can make them more flexible by adding images with different poses/compositions ... They can be trained with a small dataset like 20 images but for flexibility you'll need more.

* How much VRAM do I need for training ?
> It depends on what you're training and the parameters. SD1.5 LoRA or embedding with 512 resolution can be trained with just 6Gb. But for most things you'll need 10-12 Gb. For SDXL fine tuning, 24Gb is not really enough.

*  I really like to use class pics / regularization images for my trained loras like in Kohya.
> Class images are kind of a made up concept. They are just regular images that are trained without complicated captions, and usually at a lower weight. You can easily do this in OneTrainer by adding them as a new concept, settings the repeats lower, and maybe reducing the loss weight a bit. For the captions, select "from single file", and put your class prompt in that file
