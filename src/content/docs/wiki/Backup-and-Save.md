---
title: The Backup Tab
description: Settings related to how often you backup your training state. Helpful for restarting training at a particular point, but also can quickly bloat your harddrive if you're not careful
---

# The Backup Tab
![image](https://github.com/Nerogar/OneTrainer/assets/132208482/9bc7d23b-1c71-43df-b09f-9d1ab4b13cf8)

As models evolve larger and more complex and larger consumer GPUs become available, it is important to clarify between a backup and a save.

* Backup - This is a backup of all of the internals that OneTrainer utilizes at a period of time. It is intended to be something that you can utilize to restart OneTrainer at this point. Changing certain functions, may require input from Nero or some others to get the exact changes on how to do this. The primary use case for backups is FineTunes with hours and hours of work where you do not want to start from the beginning again if things go different than you want.
* Save - If you want to test your work during intermediate training steps, then these are the settings you want to focus on.

## Backup Focused Settings
* Backup after X Y. This will create a backup after X Epochs/Steps/Second/Minute/Hour/Never/Always. Note that Never and Always are special and will ignore your integer.
* Backup now. Pressing this button will tell OneTrainer to do a backup at the next opportunity.
* Rolling Backup - A storage saving setting. Enabling this will automatically delete backups as new ones are created.
* Rolling Backup Count - The number of backups OneTrainer will keep. Older ones will automatically be deleted if Rolling Backup is enabled.
* Backup Before Save - This setting ties backup creation to save creation. This can used in conjunction with your other backup settings, or you can use your save settings to control the backup creation.

## Save Focused Settings
* Save after X Y. This will create a save after X Epochs/Steps/Second/Minute/Hour/Never/Always. Note that Never and Always are special and will ignore your integer.
* Save Filename Prefix. A requested feature to help better sort saves. This will add a prefix to the standard OneTrainer save format.

## Notes and Comments
* Changes to this tab will be reflected in a running training.  For example if you are on epoch 9, and want to save at 10, if you make the changes to save ever 10 epochs OneTrainer will save when Epoch 9 is complete.
* Backups can be very large and can take up a lot of space very quickly.
* Saves for FineTunes (especially Stable Cascade or Pixart Alpha) require a lot of RAM (24 GB or more).  This can cause the swap file to be used which will cause a decrease in performance and can cause saves to be very slow.