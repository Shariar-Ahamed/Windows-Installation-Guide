<h1 align="center">🚀 Rufus Bootable USB Setup Guide</h1>

<p align="center">
A step-by-step guide for preparing Windows bootable installation media using Rufus.
</p>

---

# 📖 Overview

This guide explains how to use **Rufus** to prepare a bootable Windows USB drive from an existing Windows ISO image.

It covers:

- Launching Rufus
- Selecting the Windows ISO
- Configuring bootable media
- Preparing the USB drive
- Verifying the completed bootable media

---

## 🔧 About Rufus

**Rufus** is a lightweight utility used for preparing bootable USB drives for operating system installation and recovery.

It supports a variety of bootable media, including Windows installation media.

<p align="center">
  <img src="https://i.postimg.cc/g0kLcMPL/Rufus-1.png" alt="Rufus">
</p>

<p align="center">
<i>Rufus interface</i>
</p>

---

# ⚙️ Preparing a Bootable USB Drive

## ✅ Step 1 — Launch Rufus

Open the Rufus application.

<p align="center">
<img src="https://i.postimg.cc/B6zKV2kT/Rufus-2.png" alt="Launch Rufus">
</p>

---

## ✅ Step 2 — Connect a USB Flash Drive

Insert a USB flash drive into your computer.

Rufus should automatically detect the connected device.

### Example

> **Device:** ESD ISO (H:) [8 GB]

<p align="center">
<img src="https://i.postimg.cc/Wbz24QDp/Rufus-3.png" alt="USB Device">
</p>

---

## ✅ Step 3 — Configure Rufus

Configure the required options before starting the process.

### Recommended Settings

- **Boot selection:** Disk or ISO image
- Select your Windows ISO image.
- **Partition scheme:** Choose GPT or MBR according to your system.

General guidance:

- Modern UEFI systems typically use **GPT**.
- Legacy BIOS systems typically use **MBR**.

Leave the remaining settings at their default values unless you have specific requirements.

<p align="center">
<img src="https://i.postimg.cc/7hZMdgxL/Rufus-4.png" alt="Rufus Configuration">
</p>

---

## ✅ Step 4 — Windows Installation Options

### Windows 10

Review the available options and continue using the configuration appropriate for your installation.

<p align="center">
<img src="https://i.postimg.cc/cHv01z1b/Rufus-5.png" alt="Windows 10 Options">
</p>

---

### Windows 11

Review the available options and continue using the configuration appropriate for your installation.

<p align="center">
<img src="https://i.postimg.cc/5NK0J8m5/Rufus-9.png" alt="Windows 11 Options">
</p>

---

## ⚠️ USB Preparation Notice

Preparing the USB drive will erase existing data stored on it.

Ensure important files have been backed up before continuing.

<p align="center">
<img src="https://i.postimg.cc/X7GG12fJ/Rufus-6.png" alt="USB Warning">
</p>

---

## ✅ Step 5 — Prepare the Bootable USB

Rufus will prepare the Windows installation media on the USB drive.

<p align="center">
<img src="https://i.postimg.cc/SxGMcnLQ/Rufus-7.png" alt="Preparing Bootable USB">
</p>

---

## ✅ Step 6 — Verify the Bootable USB

After the preparation process is complete, verify that the bootable USB drive has been created successfully.

### Windows 10

<p align="center">
<img src="https://i.postimg.cc/4xYD9cRH/Rufus-8.png" alt="Windows 10 Bootable USB">
</p>

---

### Windows 11

<p align="center">
<img src="https://i.postimg.cc/jSwCB68S/Screenshot-2026-05-20-213258.png" alt="Windows 11 Bootable USB">
</p>

---

> ## ➜ Next Step
>
> Continue to **03-Windows-Installation** for the Windows installation process.

---

# 📌 Notes

- A USB drive with at least **8 GB** capacity is recommended.
- Existing data on the USB drive will be erased during preparation.
- Use the appropriate partition scheme (GPT or MBR) for your system.
- Review your configuration before starting the preparation process.

---

<h2 align="center">📚 Bootable USB Preparation Guide Completed</h2>
