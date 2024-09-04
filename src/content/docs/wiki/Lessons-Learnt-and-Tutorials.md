---
title: Lessons learned and tutorials
description: Information and advice learned from people experimenting with trainign
---
This section contains various information collected from the Discord server. Those on top has been given by the developers, others (followed by "by or from username") are shared experiences so consider them for what they are, not "a way to do" and may contain missleading information, if you find any please report them in the Discord wiki-discussion.

### Samples Issues
* If your sample images are black, set Override VAE Data type to bfloat16 or float32 (Model tab).
* For embeddings, if your samples image are always the same, you either forget to put `<embedding>` in the sample prompt or in the captions for your concept.
### Randomizing captions
* You can add multiple captions. One per line in the txt file. And it will randomly choose one for each epoch.
### Multi resolution training
* It's a new feature that can increase your training quality. Tested with a LoRA for SDXL and a small dataset (30 images). You can train multiple resolutions at the same time by specifying a comma separated list of numbers in the resolution field. Each step will train on a randomly selected resolution from the list. It has been noticed that multi resolution training can greatly improve the model quality.
* Example: Set the training resolution to 896,960,1024,1088,1152 (up and down by 64px) and add 5 identiqual concepts ready for at least 1152 resolution with resolution override set respictively to 896,960,1024,1088,1152, divide your required epochs by 5 as it will use 5x more steps.
* Optionally use [resolution override](https://github.com/Nerogar/OneTrainer/wiki/Concepts#image-augmentation-tab) on the concepts.


###  Image Results Differential Diagostics, from Alaiya @ OnePawProductions:
![Ai Error Types](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/363a2504-4e10-4315-9d0e-68cb56347fea/dgplseb-00038eba-6c9e-4c19-9c7f-1bb2e57de060.png/v1/fit/w_828,h_496,q_70,strp/ai_errors_in_sdxl_lora_training__using_onetrainer_by_onepawproductions_dgplseb-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY4IiwicGF0aCI6IlwvZlwvMzYzYTI1MDQtNGUxMC00MzE1LTlkMGUtNjhjYjU2MzQ3ZmVhXC9kZ3Bsc2ViLTAwMDM4ZWJhLTZjOWUtNGMxOS05YzdmLTFiYjJlNTdkZTA2MC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.4CnHWHT_nOnNVbr8AlreAl3koI-fzGOYMo_nNNPIuZg)

Here we see three different examples of noisy images generated during the sampling process.

In the first image, the output is complete noise, as you can tell from the randomness and high degree of colorful contrast. This indicates that the resolution isn't matching. If the LORA being trained is SDXL (a resolution of 1024x1024) and you set the sampling image output to 512x512, it will not be able to generate coherent images.

In the second image, we see something cohesive, but noisy. There's gradients, both muted and high contrast colors, and it functions as an image, albeit a noisy one. There are no real identifiable shapes. This can happen when your unique identifier is unparsable to the ai, such as "lkjasdf", or "myGreatOC", or in this case "Muse". As the Ai looks at your dataset and learns to associate the images and tags with the unique identifier, it should converge (resolve into identifiable and replicatable patterns relating to your dataset) between steps 2-50, and become clearer and clearer.

In the last image, we see an identifiable image, though it is highly incorrect and unrelated to the dataset. This can happen when the unique identifier used carries with it other concepts that the Ai thinks are associated with those words/that word. The unique identifier might be something like "Hannah Bearlet", or "myElegantCharacterBearnois", or something similar. This image came from "Taylor Hebert", and convergence happened very early, in Epoch 2, when the Ai realized Taylor Hebert is not, in fact, a bear.

![Ai Not Recognizing Data](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/363a2504-4e10-4315-9d0e-68cb56347fea/dgplib3-32188c19-e92b-4901-ba44-7d061be00dc4.png/v1/fit/w_828,h_372,q_70,strp/onetrainer_troubleshooting_by_onepawproductions_dgplib3-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvMzYzYTI1MDQtNGUxMC00MzE1LTlkMGUtNjhjYjU2MzQ3ZmVhXC9kZ3BsaWIzLTMyMTg4YzE5LWU5MmItNDkwMS1iYTQ0LTdkMDYxYmUwMGRjNC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.X8p4-sXQSOoomMPRtSQ7h2w3rVJWKdDBpahT4QjK8Do)

In this training run of 100 epochs, we see that the Ai isn't recognizing and connecting the dataset to the image training and output. The first image is pure noise, and because it's SDXL, it tried to include some text. But even as the epochs progress, the images remain noisy, despite increasing clarity in the resolution.

This can be remedied by taking into account how OneTrainer reads your data. In OneTrainer > Concepts > General, you will find:
* from text files per sample
* from single text file
* from image file name 

From Text Files Per Sample: this will read the data from a .txt file that shares the same name as your image, such as image1.png, image1.txt. This lets you have a longer description and more tags associated with your image than by using the image file name, which (at least in Windows) has a set cap on the length of the image title.

From Single Text File: this will read a single text file and apply it to all of the images, similar (I believe) to the process of a textural inversion embedding

From Image File Name: this will read data from the image file name, which can be a useful work-saving measure, but note that image file names are often capped at a certain length. If you go over, it could corrupt your file (it did mine).

![Ai Functioning Well](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/363a2504-4e10-4315-9d0e-68cb56347fea/dgplm9d-dd97e45e-60dd-4799-ab6f-9268e5d3da16.png/v1/fit/w_828,h_506,q_70,strp/onetrainer_troubleshooting__ai_functioning_well_by_onepawproductions_dgplm9d-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzgxIiwicGF0aCI6IlwvZlwvMzYzYTI1MDQtNGUxMC00MzE1LTlkMGUtNjhjYjU2MzQ3ZmVhXC9kZ3BsbTlkLWRkOTdlNDVlLTYwZGQtNDc5OS1hYjZmLTkyNjhlNWQzZGExNi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Ry2ChFSalxtZwRRp62OA5tNIqUkIemoDVNrGE_yGdNY)

Here we see what one can expect when the process goes right. My sampling text "Muse jumping" at first was rendered by the Ai in early epochs (less than 10) as the rock band Muse, jumping. At mid stages of the epochs (10-50 epochs) we see the figures begin to develop animal characteristics, as the dataset is comprised of shots of Muse, the Pink Calico Mascot. By later epochs, we see convergence has happened, and the Ai now recognises the tag "Muse" (or, myMuse) as belonging to the images in the dataset. We see the dropshadow, grey background, style, and characteristics that were tagged in the dataset.


###  Notes on Gradient Accumulation and Batch Size, by Alaiya @ OnePawProductions

Gradient Accumulation and Batch Size (ie, how many images are referenced during training, and then during use of the LORA) can have a nice impact on the output from the LORA, both in a positive and negative way. You can see this pattern through the use of your LORA over time when, due to the gradient accumulation of 1 (image that is referenced is one single image, not many images), some of the images are very highly obviously spawned off of one particular image or another.

Gradient Accumulation and Batch Size of "1" has positives and negatives:

Positive: more differentiation in the dataset between related concepts, ie, I'm making a LORA for Taylor Hebert...but which Taylor? Beautiful!Taylor? Canon!Taylor? Tinker Taylor, or the variant from one specific fanfic? With a gradient accumulation of 1, each time I run a gen session (using the Combinatorial Prompt Extension, which I highly recommend using for dataset diversification) I get a plethora of different images spawned, each, off of a single image. These go into different folders, for each of the different variants, so that my LORA for Taylor can dial in the flexibility. It's a big part of how I'm designing all-Ai in put datasets for LORA. Hopefully avoiding model collapse. So images spawned using a GA of 1 might produce variations on the Beautiful variant, Canon/Perfect variant, Tinker variant, or Skitter variant, and by using the Combinatorial Dynamic Prompting Extension, these variants can be made to do a variety of different things, wearing different clothes, in different backgrounds, with different facial and body expressions.

Negatives: If you reference, in your prompts, tags that derive from several images but using a LORA trained with a GA of 1, you might end up with crazy things like double-headed twins (as far as I can tell, an unfortunate result of using the "flip copy" data diversification tactic. I think the flip copy is useful, however, especially in cases where bilateral symmetry doesn't matter). It can also make it hard to create a cohesive "look", ie, full facial fidelity is a mite bit harder to achieve. By using a higher GA, you reference several images for each output, which can help resolve the facial fidelity into a more cohesive whole.

### LoRA Training suggestions with Prodigy by Malessar
* Use the same value for the Lora Rank and alpha. 8/8 seems good for a person, 16/16 can be better but less flexible unless with a very good image captioning. Note alpha needs to be equal or lower than rank.
* Use Prodigy optimizer with bias correction on and a weight decay of 0.01 (default is 0.1 and also can work).
* Scheduler Cosine
* Use a learning Rate of 1 for TE and Unet, Note: the TE is optional and hard to train for SDXL, up to you to use it or not, you can try either TE 1 or 2 as they work differently.
* Batch size: whatever your vram can hold, multiples of 2 are look more efficient.
* Data type set to float 32 everywhere (training and model tabs) if your VRAM can handle it. But default values coming with the preset works fine.

### REX scheduler usage by Hypopo
* This scheduler will decay the LR from its initial value (set in the Learning Rate field) to 0 following a reverse exponential curve. Its hability is to train very fast. I've tested it combined with standard optimizers like ADAMW or CAME for **mostly embedding** and some LoRA, it also works good with a small dataset (6-20) for **embedding** again. Lora likes more images in general even 20 can be sufficient for a person.

Training an embedding with it on SD1.5 with 100 epochs and 15-20 images takes me (16GB VRAM) less than 5 minutes, 20 minutes on SDXL to give an idea.

<img width="233" alt="REX" src="https://github.com/Nerogar/OneTrainer/assets/129741936/6c6d1ed9-4983-4dd4-aaea-44ae64a279ff">

* Don't use any warmup with it.
* Try to use a high batch x AS combo (=< `#`images) with small dataset. Reduce it when your dataset is versatile. Note that if all your images are not on the same ratio batch x AS = `#`images will fail and some images will get dropped. Idea is to optimize the training time, a lower value will require more epochs.
* Trick is to find the good initial LR, for **embeddings** I start with 0.0038 to get a first idea then move it down to find the magic one, usually between 0.004 and 0.002 from my experience, feel free to try others. For LoRA you'll need a lower LR. The good LR depends on the dataset, number images and their consistency, when the model is overtrained, you can try to reduce it or the epochs.
* No need of many epochs as it trains very fast, for embedding having too many epochs won't have a big influence, I had good results with 100 epochs, sometimes a bit more, for a LoRa you'll need a lower LR and more epochs.
* Let the training go to its end as it needs to follow the full curve to be efficient. It also may not support to be continued from a last backup (not tested myself but some users were able to do it).
* I usually try to find first the good batch*AS combo then the good LR and finally reduce the epoch to only what's required.

### Stable Cascade LORA training by Drift Johnson
[Stable Cascade LORA training (Youtube)](https://www.youtube.com/watch?v=dmSZ5TWEWTQ)

[Stable Cascade LORA training with Onetrainer (Civitai)](https://civitai.com/articles/4253/stable-cascade-lora-training-with-onetrainer)

### Weird issue with ZLUDA by Heasterian
* If you're getting weird noisy non-ema samples every x epoch when using ZLUDA, check if loss is not lower on those epochs. If that's the case, turn of Autocast Cache. Looks like it's causing this issue.

### Video Tutorial for finetuning with low VRAM by SECourses
* [133 Min Full Video Tutorial](https://github.com/Nerogar/OneTrainer/wiki/Full-Stable-Diffusion-SD-&-XL-Fine-Tuning-Tutorial-With-OneTrainer-On-Windows-&-Cloud-%E2%80%90-Zero-To-Hero)

### ZLUDA Notes by Calamdor
Zluda is being developed to be able to allow AMD graphics cards to work with CUDA. Currently RoCm is only available on Linux, which limits the use of AMD cards on windows.
The best fork for ZLUDA is here (as the original developer posted the work, but will not work on it) (https://github.com/lshqqytiger/ZLUDA)
It is not necessary to use this ZLUDA package, OneTrainer will allow the option to install ZLUDA as part of the install.bat process and it will be installed to a subfolder in OneTrainer.
The best information on getting working and notes about it is currently on the SD.next wiki (https://github.com/vladmandic/automatic/wiki/ZLUDA)
Some notes about ZLUDA:
- Check your device. (https://rocm.docs.amd.com/projects/install-on-windows/en/develop/reference/system-requirements.html) If your card does not have checkboxes in both columns, you will need to download the special libraries for Rocmlibs found on the SD.next wiki or build them yourself.
- Ensure you have the AMD pro drivers (optional?) and HIP framework installed. Links are on the SD.next wiki.
- Have patience. ZLUDA needs to compile at first use. No info is displayed that it is doing this, and it can take quite a long time. This compile is likely for every new CUDA function that occurs (the first time).
- XFormers does not work, so use default or SDP when training.
- ZLUDA is a CUDA wrapper, so use CUDA as the device.
- Be aware of the standard ZLUDA limitations, especially with regards to integrated AMD graphics.

### Low VRAM Configuration - by efhosci
Using the right settings it's just barely possible in OneTrainer to get under 3 GB of VRAM usage while training with SD 1.5, which might be feasible for older laptop GPUs, low-end desktop GPUs, or VRAM-limited "mining" GPUs. It's probably not going to be fast on older cards, but for a single-concept LoRA you may be able to have it complete in under an hour, compared to possibly several hours running on CPU. Disclaimer - I don't really understand the underlying mechanism of most of these settings, I'm just watching how changing them affects VRAM usage. System is running Linux Mint, GPU is P100, VRAM usage was monitored using nvidia-smi. Information is up-to-date as of May 2024.

Here are the main things that seem to help, or I verified have no effect. Anything not listed has probably no effect - I didn't tweak every setting, but anything that's a multiplier to the learning rate or noise strength or similar would be unlikely to have an effect on memory usage. Roughly in order by tabs:
- It doesn't matter if you use a "pruned" or "full" model, at least with the following weight settings. Pruned ones should be around 2 GB file size, as opposed to full checkpoints which are around 5-6 GB.
- Set all weights in "model" to float8 if possible, float16 otherwise. Biggest effect seems to be with the UNet, the difference between setting it to float8/16 is about 0.8 GB. Text encoder is around 100 MB and VAE has no perceptible difference. Setting output data type to float8 caused errors with sampling and saving so that was kept to float16, and be aware that low precision for all stages may potentially cause some quality issues in the output.
- Turning latent caching on saves around 100 MB.
- Using ADAMW_8BIT instead of ADAMW saved around 50 MB, regardless of whether model weights were set to float16 or float8. ADAFACTOR was around the same. Some of the optimizer-specific settings may affect VRAM usage, but the defaults should be fine. See [here](https://github.com/Nerogar/OneTrainer/wiki/Optimizers) for more specifics on that.
- Batch size needs to be set at 1 - going to 2 more than doubled VRAM used (from 2.8 GB to almost 7 GB). Batch size 3 and 4 were also both around 7 GB, going to 8 was around 8.3 GB, and at 32 it seemed to top at 13.5 which would suggest roughly 250 MB per additional image in a batch (at 512 resolution).
    - Update: After doing some further testing with SDXL, I think the reported VRAM usage here may not be accurate - I'm not certain what's happening, but it seems like some files may be kept in memory without clearing them, and thus nvidia-smi is reporting more memory usage than what OneTrainer actually is using. Batch size 2 or 3 may be able to fit in 4 GB of VRAM.
- Accumulation steps had a minor effect of 20 MB or less when increasing it above 1. Increasing this should be functionally similar to a higher batch size, but significantly slower. Comparing batch size 8 and gradient accumulation steps 1 to the inverse, the former finished more than twice as fast.
- Compared to "default" attention, xformers and SDP both save around 2.8 GB, about half of what it used otherwise, so always enable either of those.
- Turning gradient checkpointing on also saves nearly 2 GB, but cut the speed by at least 30%.
- Setting train data type as float16 instead of float32 saves around 80 MB.
- Autocast cache mentions a difference in speed and memory, but I saw no difference between on/off.
- Image resolution at 768 (both in "training" and on the active concept) vs at 512 on both was a difference of about 0.7 GB, so keep maximum resolutions set low.
- AlignProp uses a LOT of VRAM, EMA had little/no impact. Neither should be necessary to enable for simple LoRA or embedding training.
- Enabling masked training didn't increase VRAM used by much, maybe a few MB, but currently it does not work when latent caching is enabled.
- Different loss weight functions varied by only a few MB.
- During sampling, with a 512x512 image, VRAM peaked at around 2.7 GB. This is less than it settles at during training (around 2.8 GB with all the above optimizations) so don't worry about disabling sampling to save VRAM. 768x768 sample images seemed to be steady around 2.8 GB but may have briefly spiked just above 3 GB when switching to training, so don't increase the resolution too much if you're running close to the limit.
- No significant spike in VRAM used during backup or save.
- I trained at LoRA rank 16 for all previous tests - rank 32 was around 60 MB higher, rank 64 was about 200 MB higher, rank 8 was around 40 MB less so it's roughly linear. Rank 16 should be sufficient for most purposes. Alpha and dropout didn't have any effect on VRAM.
- Changing LoRA weight data type from float32 to bfloat16 saved maybe 30 MB of VRAM, however I'm using an older card that doesn't support it, so the benefit may be higher if using >3000 series cards - but then you're less likely to have heavy VRAM constraints.
- Training an additional embedding along with a LoRA adds about 80 MB to VRAM usage, higher token count doesn't have any effect.

With all above optimizations, the program maxed out around 2.8 GB while running. Training went at about 1.1 it/s for me, with 1000 steps total (plus some time for sampling) total training time was about 1100 seconds, or 19 minutes. The card I'm using is listed at 19 TFLOPS fp16 and 9.5 FLOPS fp32 on TechPowerup, you may be able to estimate training time for other GPUs based on that. For example with a T1200 laptop GPU (7.3/3.6 fp16/fp32, 4 GB VRAM) it should theoretically take around 2.5x longer, around 50 minutes, though the addition of tensor cores to newer GPUs means they may perform faster in practice. Also going to be difficult to estimate differences due to memory speed, cache, and some other factors. If a card has a listed lower fp16 than fp32, or none listed, you can assume for practical purposes it's equal to fp32. Really old Nvidia GPUs (more than 10 years old) may not work at all due to software support issues, and AMD is probably similar. 

[Here's an example config file for training under 3 GB.](https://github.com/Nerogar/OneTrainer/files/15445637/lowvram-3GB.json) Settings related to learning rate and epochs may need to be altered depending on your data, but I was able to get a somewhat decent single-character LoRA using this.

If you have 4 GB of VRAM available, the most beneficial settings to change would probably be changing the model weights to fp16, train data type to fp32, using a non 8-bit optimizer, and maybe increase training resolution to 640. That came just under 4 GB for me. With 6 GB, you can probably turn off gradient checkpointing for the speed boost, or you could try even higher resolutions and float precisions.


Update (August 2024): I did some quick testing with SDXL as well - using the same settings as above (weights as fp8, latent caching, batch 1, SDP on, gradient checkpointing on, etc) but with resolution set to 1024 the VRAM usage peaked around 5.8 GB and ran around 3.5 s/it. Lowering the resolution to 768 or even 512 seemed to barely affect VRAM used. With batch size of 2, VRAM usage showed around 15.1 GB and it ran around 5 s/it, however it seems like a lot of that reported VRAM usage is "leftover" files that aren't being removed from memory until it's nearly full, and the true VRAM usage might be under 8 GB. I tested that same config on an 8 GB card and it looks like batch 2 at fp8 was just barely able to fit in VRAM, though it was painfully slow.

Increasing all the weights to fp16 hits around 8.6 GB at batch size 1, you should be able to get under 8 GB if you set the text encoder weights to fp8 or only train one of the text encoders. At batch size 2, VRAM settles around 10.4 GB - I think this is because of what I mentioned above, with the increased memory usage at fp16 it clears out the memory sooner and thus seems to run at a lower memory. This would fit in a 10/2080 Ti's weird 11 GB memory in theory, but I can't confirm that. Either way, you should be able to train SDXL models with only 6 GB of video memory if required, though 8 GB is going to be a lot easier to work with.


### Images Containing Artifacts or Lower than Expected Quality by Lim1tBreak

If you have trained a LoRA on a certain concept with a good dataset, prompts and training parameters but still get results with subpar quality such as the following image, try applying a hi-res fix to the generation.

![without hi-res fix](https://i.imgur.com/H4Iz5Ah.png)

In A111, this is as simple as enabling the hi-res section.

In ComfyUI, take the latent from the first Ksampler's output, upscale the latent by at least 1.25 and use that latent as the input to an identical Ksampler with 0.5-0.7 denoising strength. Applying this technique to the above image yielded the following result:

![Hi-res fix applied](https://i.imgur.com/cEmvo8F.png)


### Training with PixArt Sigma by Ejektaflex

PixArt Sigma so far seems to be quite capable when it comes to training - however, Prodigy in some cases may massively underestimate the learning rate if used when training PixArt. If samples don't seem to be indicative of learning, or learning is slow, it might be beneficial to increase `d_coef` in the optimizer settings by even a **large** margin. Anecdotally, 1.0 has been too little and 8.0 has caused model collapse, with a `d_coef=4.0` hitting the sweet spot in terms of learning that roughly equates to similar learning speeds with SDXL when using cosine annealing (cosine with hard restarts with only one cycle). 

Another option is to increase "Initial-D" to combat the lower starting LR. The higher you place it, the less Prodigy needs to compensate. However, Prodigy will only ever *increase* the LR and will never decrease it, so too high of an Initial-D value will very likely be too high of a LR for your model and Prodigy will never lower itself to compensate!

Additionally, Prodigy can be almost useless for guessing learning rates when used to train an embedding (as of 2024-06-19). The chosen learning rate (it settled on 1e-5) was too small to even encourage changes in the sample images. Using ADAMW optimizer with a LR of **0.1** seemed to give results, though not enough testing has been done to determine an optimal ballpark rate.

As bad as Prodigy might seem, **it is still a useful tool** for finding an optimal LR, as long as you don't mind doing one sub-optimal training session. I generally let Prodigy find the LR on it's own for one training, and then look at the peak LR that it ever finds. Using that peak LR, I either:
* Do another Prodigy training at d_coef=1.0 with an Initial-D equal to that peak LR
* Do a training with ADAMW at an LR equal to that peak LR

The most important takeaway here is that PixArt, Prodigy and possibly other adaptive optimizers may underestimate the learning rate and be the cause of slow learning. This may also be present in other DiT models such as Stable Diffusion 3, though time will tell.