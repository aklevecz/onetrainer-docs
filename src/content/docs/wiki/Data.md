---
title: Data Preprocessing
description: Learn about circular mask generation, random rotate and crop, aspect ratio bucketing, and latent caching for training inpainting models.
---

"Circular Mask Generation" and "Random Rotate and Crop" are mostly intended to train inpainting models. With these settings you can automatically create random circular masks for your images. You can also randomly rotate and crop the images to the masked region.

Aspect Ratio Bucketing makes it possible to train the model on images with different aspect ratios at the same time. All images are resized to roughly match the same total pixel count.

Latent caching will speed up the training by saving intermediate data. If this setting is enabled, some data will be calculated based on your training images and saved to disc.