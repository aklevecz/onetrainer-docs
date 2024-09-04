---
title: Common Mistakes Coming From Kohya
description: Learn about common mistakes that users coming from Kohya may encounter when using Onetrainer, including issues with image batch size, precision errors, scale parameter, and troubleshooting tips.
---

# Common Mistakes Coming From Kohya

## Too Few Images / Too Large Batch Size

This will commonly hit people with very small (< 100 images) datasets with widely varying resolutions. Onetrainer requires an image resolution bucket to fill a complete batch. If that bucket does not fill a batch, that bucket is *discarded*. Kohya has a different behavior, where if the bucket is short it will duplicate some of the data in it to fill the batch. There are pros and cons to both strategies, and Onetrainer and Kohya have chosen different ones.

You can tell if you have this problem when you have fewer than expected steps per epoch. At the extreme, you'll even see 1 or 0 steps per epoch. If this problem is affecting you, you can work around it by either increasing your number of repeats (which duplicates data to potentially fill the batch) or reduce your batch size.

## Precision Errors

If you have something working in Kohya but not in Onetrainer, make absolutely certain that you are training at the same level of precision in both. BF16 and F32 can have *wildly* different outcomes between them. Triple check your config. Make sure that everything you set at a precision level in Kohya, you've set equivalently in Onetrainer.

## Scale Parameter

If you're training a LoRA from scratch and using Adafactor, turn off scale parameter. It's got a very specific use case, and LoRA training from scratch is not one of those uses. You can train for a hundred epochs and get nowhere if you leave this turned on.

## Help! I Still Have Problems!

If, after checking all of these issues, you still can't get results in Onetrainer that match your results in Kohya, do the following:

- Export your .json configs from Kohya and Onetrainer.
- Compare them line-by-line. Make sure that all the settings in Kohya you have set in Onetrainer.
- If, after the above, you still have trouble, you are welcome to come to the Discord and ask in the #help channel. Make sure you've done the above two steps first, though. The configs are going to be the first things we ask for.