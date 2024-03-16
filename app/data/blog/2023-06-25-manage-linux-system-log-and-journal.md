---
title: Manage Linux System Log and Journal
date: "2023-06-25"
tags: ["linux", "log", "journal"]
draft: false
summary: It is very important to know about system log files. It will help in system debugging in case of system failure.Some time log files are old enough and are large in size so we need to delete them too. Read how to manage system log files.
images: [""]
layout: PostLayout
---

It is very important to know about system log files. It will help in system debugging in case of system failure.Some time log files are old enough and are large in size so we need to delete them too. Read how to manage system log files.
All system log files are located in **/var/log** directory in linux.

## View all content of a file:-

```bash
$ cd /var/log
$ cat auth.log
```

## View last 10 lines of a file:-

```bash
$ cd /var/log
$ tail auth.log
```

## View last 500 lines of a file:-

```bash
$ cd /var/log
$ tail -n 500 auth.log
```

## View first 10 lines of a file:-

```bash
$ cd /var/log
$ head auth.log
```

## View first 100 lines of a file:-

```bash
$ cd /var/log
$ head -n 100 auth.log
```

## Know the file size/space:-

```bash
$ du -h
```

It will report total amount of space used by all files in a path.

## Delete log content without removing a file:-

```bash
$ cd /var/log
$ sudo truncate -s 0 auth.log
```

## Search all files with a extension:-

```bash
$ cd /var/log
$ sudo find /var/log -type f -regex ".*\.gz$"
```

It will search all files in **/var/log** path with a **.gz extension**.

## Search and delete all files with a extension:-

```bash
$ cd /var/log
$ sudo find /var/log -type f -regex ".*\.gz$ -delete"
```

It will search all files in **/var/log** path with a **.gz extension** then delete them.

## Search all files ending with number:-

```bash
$ cd /var/log
$ sudo find /var/log -type f -regex ".*\.[0-9]$"
```

It will search all files in **/var/log** path with a **number ending in file name** Example:- **dmesg.0, dmesg.1**.
To delete those files use **-delete**.

- What is Journalctl:- <br />
  It is a tool for displaying and querying logs from systemd's logging service and journald. All the content of the logs are in binary format
  so to read the log message journalctl is used.

## Manage journal size

```bash
$ journalctl --disk-usage
```

Output will be:- Archived and active journals take up 32.0M in the file system. Size may vary in your system.

## Delete journal size

```bash
$ journalctl --vacuum-size=200M
```

This will delete most recent 200M archived data.

## Delete journal size after X days

```bash
$ journalctl --vacuum-time=10d
```

This will delete everything but last 10 days archived data.

## Verify Journal data

```bash
$ journalctl --verify
```

This will verify journal entry and display corrupted data.

## View Journal data

```bash
$ journalctl -u systemd-fsck@dev-disk-by\\x2duuid-861B\\x2dA0E5.service
```

This will display all the content.
