import { useState, useEffect, useRef, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const RAW_DATA = [
  {i:0,t:28.9,s:20.0},{i:1,t:28.0,s:20.0},{i:2,t:26.3,s:20.0},{i:3,t:24.0,s:20.0},{i:4,t:22.1,s:20.0},{i:5,t:21.0,s:20.0},{i:6,t:19.9,s:20.0},{i:7,t:18.8,s:20.0},{i:8,t:17.7,s:20.0},{i:9,t:16.5,s:20.0},{i:10,t:15.5,s:20.0},{i:11,t:14.4,s:20.0},{i:12,t:13.0,s:20.0},{i:13,t:11.9,s:20.0},{i:14,t:11.2,s:20.0},{i:15,t:12.2,s:20.0},{i:16,t:14.7,s:20.0},{i:17,t:17.0,s:20.0},{i:18,t:19.9,s:20.0},{i:19,t:23.1,s:20.0},{i:20,t:25.7,s:20.0},{i:21,t:28.0,s:20.0},{i:22,t:29.5,s:20.0},{i:23,t:30.4,s:20.0},{i:24,t:30.7,s:20.0},{i:25,t:30.1,s:20.0},{i:26,t:28.7,s:20.0},{i:27,t:25.9,s:20.0},{i:28,t:22.6,s:20.0},{i:29,t:20.1,s:20.0},{i:30,t:18.3,s:20.0},{i:31,t:16.8,s:20.0},{i:32,t:15.6,s:20.0},{i:33,t:14.4,s:20.0},{i:34,t:13.4,s:20.0},{i:35,t:12.3,s:20.0},{i:36,t:11.5,s:20.0},{i:37,t:10.7,s:20.0},{i:38,t:10.3,s:20.0},{i:39,t:10.9,s:20.0},{i:40,t:13.8,s:20.0},{i:41,t:18.4,s:20.0},{i:42,t:22.4,s:20.0},{i:43,t:26.5,s:20.0},{i:44,t:29.0,s:20.0},{i:45,t:31.6,s:20.0},{i:46,t:33.0,s:20.0},{i:47,t:33.4,s:20.0},{i:48,t:33.1,s:20.0},{i:49,t:31.9,s:20.0},{i:50,t:29.7,s:20.0},{i:51,t:26.4,s:20.0},{i:52,t:23.7,s:20.0},{i:53,t:21.2,s:20.0},{i:54,t:19.5,s:20.0},{i:55,t:17.7,s:20.0},{i:56,t:16.2,s:20.0},{i:57,t:15.0,s:20.0},{i:58,t:14.0,s:20.0},{i:59,t:13.1,s:20.0},{i:60,t:12.3,s:20.0},{i:61,t:11.5,s:20.0},{i:62,t:11.0,s:20.0},{i:63,t:11.6,s:20.0},{i:64,t:14.0,s:20.0},{i:65,t:16.9,s:20.0},{i:66,t:19.6,s:20.0},{i:67,t:22.2,s:20.0},{i:68,t:24.4,s:20.0},{i:69,t:26.2,s:20.0},{i:70,t:27.7,s:20.0},{i:71,t:28.1,s:20.0},{i:72,t:26.8,s:20.0},{i:73,t:25.1,s:20.0},{i:74,t:23.2,s:20.0},{i:75,t:21.0,s:20.0},{i:76,t:18.8,s:20.0},{i:77,t:16.9,s:20.0},{i:78,t:15.6,s:20.0},{i:79,t:14.7,s:20.0},{i:80,t:14.1,s:20.0},{i:81,t:13.3,s:20.0},{i:82,t:12.6,s:20.0},{i:83,t:12.0,s:20.0},{i:84,t:11.4,s:20.0},{i:85,t:10.9,s:20.0},{i:86,t:10.5,s:20.0},{i:87,t:11.0,s:20.0},{i:88,t:13.9,s:20.0},{i:89,t:17.2,s:20.0},{i:90,t:20.3,s:20.0},{i:91,t:23.0,s:20.0},{i:92,t:25.3,s:20.0},{i:93,t:27.2,s:20.0},{i:94,t:28.5,s:20.0},{i:95,t:28.1,s:20.0},{i:96,t:27.4,s:20.0},{i:97,t:26.1,s:20.0},{i:98,t:24.4,s:20.0},{i:99,t:22.5,s:20.0},{i:100,t:20.5,s:20.0},{i:101,t:18.7,s:20.0},{i:102,t:17.3,s:20.0},{i:103,t:15.7,s:20.0},{i:104,t:14.6,s:20.0},{i:105,t:13.5,s:20.0},{i:106,t:12.6,s:20.0},{i:107,t:11.7,s:20.0},{i:108,t:11.0,s:20.0},{i:109,t:10.7,s:20.0},{i:110,t:10.3,s:20.0},{i:111,t:10.9,s:20.0},{i:112,t:14.3,s:20.0},{i:113,t:18.7,s:20.0},{i:114,t:22.2,s:20.0},{i:115,t:25.6,s:20.0},{i:116,t:28.0,s:20.0},{i:117,t:29.9,s:20.0},{i:118,t:30.7,s:20.0},{i:119,t:31.2,s:20.0},{i:120,t:30.9,s:20.0},{i:121,t:30.3,s:20.0},{i:122,t:28.5,s:20.0},{i:123,t:26.2,s:20.0},{i:124,t:24.3,s:20.0},{i:125,t:22.9,s:20.0},{i:126,t:21.6,s:20.0},{i:127,t:20.2,s:20.0},{i:128,t:18.8,s:20.0},{i:129,t:17.7,s:20.0},{i:130,t:17.0,s:20.0},{i:131,t:16.9,s:20.0},{i:132,t:15.9,s:20.0},{i:133,t:14.7,s:20.0},{i:134,t:13.8,s:20.0},{i:135,t:14.2,s:20.0},{i:136,t:17.3,s:20.0},{i:137,t:20.2,s:20.0},{i:138,t:23.3,s:20.0},{i:139,t:27.1,s:20.0},{i:140,t:29.8,s:20.0},{i:141,t:31.8,s:20.0},{i:142,t:32.4,s:20.0},{i:143,t:32.6,s:20.0},{i:144,t:32.4,s:20.0},{i:145,t:31.2,s:20.0},{i:146,t:28.8,s:20.0},{i:147,t:25.9,s:20.0},{i:148,t:22.9,s:20.0},{i:149,t:20.8,s:20.0},{i:150,t:19.4,s:20.0},{i:151,t:18.1,s:20.0},{i:152,t:17.0,s:20.0},{i:153,t:15.9,s:20.0},{i:154,t:14.8,s:20.0},{i:155,t:13.7,s:20.0},{i:156,t:11.9,s:20.0},{i:157,t:11.2,s:20.0},{i:158,t:11.7,s:20.0},{i:159,t:14.6,s:20.0},{i:160,t:18.4,s:20.0},{i:161,t:21.3,s:20.0},{i:162,t:24.3,s:20.0},{i:163,t:27.1,s:20.0},{i:164,t:28.9,s:20.0},{i:165,t:30.0,s:20.0},{i:166,t:30.5,s:20.0},{i:167,t:30.3,s:20.0},{i:168,t:29.5,s:20.0},{i:169,t:28.0,s:20.0},{i:170,t:25.8,s:20.0},{i:171,t:23.6,s:20.0},{i:172,t:21.6,s:20.0},{i:173,t:20.3,s:20.0},{i:174,t:18.8,s:20.0},{i:175,t:17.8,s:20.0},{i:176,t:16.9,s:20.0},{i:177,t:16.3,s:20.0},{i:178,t:15.7,s:20.0},{i:179,t:14.9,s:20.0},{i:180,t:13.9,s:20.0},{i:181,t:13.1,s:20.0},{i:182,t:13.5,s:20.0},{i:183,t:15.7,s:20.0},{i:184,t:18.7,s:20.0},{i:185,t:22.4,s:20.0},{i:186,t:26.1,s:20.0},{i:187,t:29.0,s:20.0},{i:188,t:30.8,s:20.0},{i:189,t:31.6,s:20.0},{i:190,t:32.1,s:20.0},{i:191,t:32.1,s:20.0},{i:192,t:31.2,s:20.0},{i:193,t:29.1,s:20.0},{i:194,t:26.0,s:20.0},{i:195,t:23.8,s:20.0},{i:196,t:22.0,s:20.0},{i:197,t:20.6,s:20.0},{i:198,t:19.9,s:20.0},{i:199,t:19.2,s:20.0},{i:200,t:18.9,s:20.0},{i:201,t:18.4,s:20.0},{i:202,t:17.5,s:20.0},{i:203,t:16.5,s:20.0},{i:204,t:15.6,s:20.0},{i:205,t:14.9,s:20.0},{i:206,t:14.9,s:20.0},{i:207,t:15.9,s:20.0},{i:208,t:17.4,s:20.0},{i:209,t:19.9,s:20.0},{i:210,t:22.5,s:20.0},{i:211,t:24.9,s:20.0},{i:212,t:26.8,s:20.0},{i:213,t:27.9,s:20.0},{i:214,t:28.3,s:20.0},{i:215,t:28.0,s:20.0},{i:216,t:27.1,s:20.0},{i:217,t:25.6,s:20.0},{i:218,t:23.3,s:20.0},{i:219,t:21.3,s:20.0},{i:220,t:19.9,s:20.0},{i:221,t:18.4,s:20.0},{i:222,t:17.1,s:20.0},{i:223,t:16.2,s:20.0},{i:224,t:15.4,s:20.0},{i:225,t:14.5,s:20.0},{i:226,t:14.3,s:20.0},{i:227,t:14.2,s:20.0},{i:228,t:12.4,s:20.0},{i:229,t:11.3,s:20.0},{i:230,t:11.7,s:20.0},{i:231,t:14.6,s:20.0},{i:232,t:17.3,s:20.0},{i:233,t:20.3,s:20.0},{i:234,t:23.3,s:20.0},{i:235,t:25.7,s:20.0},{i:236,t:27.3,s:20.0},{i:237,t:27.4,s:20.0},{i:238,t:26.8,s:20.0},{i:239,t:26.2,s:20.0},{i:240,t:25.9,s:20.0},{i:241,t:24.4,s:20.0},{i:242,t:22.4,s:20.0},{i:243,t:20.7,s:20.0},{i:244,t:19.3,s:20.0},{i:245,t:18.4,s:20.0},{i:246,t:17.7,s:20.0},{i:247,t:17.2,s:20.0},{i:248,t:16.4,s:20.0},{i:249,t:16.0,s:20.0},{i:250,t:15.9,s:20.0},{i:251,t:15.4,s:20.0},{i:252,t:14.7,s:20.0},{i:253,t:14.3,s:20.0},{i:254,t:14.7,s:20.0},{i:255,t:15.6,s:20.0},{i:256,t:16.4,s:20.0},{i:257,t:18.5,s:20.0},{i:258,t:21.4,s:20.0},{i:259,t:23.3,s:20.0},{i:260,t:23.8,s:20.0},{i:261,t:24.2,s:20.0},{i:262,t:23.8,s:20.0},{i:263,t:22.5,s:20.0},{i:264,t:21.1,s:20.0},{i:265,t:19.1,s:20.0},{i:266,t:17.9,s:20.0},{i:267,t:17.2,s:20.0},{i:268,t:16.6,s:20.0},{i:269,t:16.1,s:20.0},{i:270,t:15.9,s:20.0},{i:271,t:15.7,s:20.0},{i:272,t:15.3,s:20.0},{i:273,t:14.7,s:20.0},{i:274,t:14.8,s:20.0},{i:275,t:14.9,s:20.0},{i:276,t:15.0,s:20.0},{i:277,t:14.9,s:20.0},{i:278,t:15.1,s:20.0},{i:279,t:15.9,s:20.0},{i:280,t:17.4,s:20.0},{i:281,t:18.7,s:20.0},{i:282,t:19.3,s:20.0},{i:283,t:19.9,s:20.0},{i:284,t:19.6,s:20.0},{i:285,t:20.5,s:20.0},{i:286,t:21.0,s:20.0},{i:287,t:20.4,s:20.0},{i:288,t:20.2,s:20.0},{i:289,t:20.1,s:20.0},{i:290,t:18.0,s:22.0},{i:291,t:16.9,s:22.0},{i:292,t:16.5,s:22.0},{i:293,t:15.6,s:22.0},{i:294,t:14.8,s:22.0},{i:295,t:14.7,s:22.0},{i:296,t:14.3,s:22.0},{i:297,t:14.1,s:22.0},{i:298,t:14.4,s:22.0},{i:299,t:14.3,s:22.0},{i:300,t:13.8,s:22.0},{i:301,t:13.6,s:22.0},{i:302,t:13.9,s:22.0},{i:303,t:16.0,s:22.0},{i:304,t:18.2,s:22.0},{i:305,t:19.3,s:22.0},{i:306,t:21.8,s:22.0},{i:307,t:23.7,s:22.0},{i:308,t:25.7,s:22.0},{i:309,t:26.9,s:22.0},{i:310,t:27.3,s:22.0},{i:311,t:26.3,s:22.0},{i:312,t:25.3,s:22.0},{i:313,t:23.7,s:22.0},{i:314,t:21.1,s:22.0},{i:315,t:18.9,s:22.0},{i:316,t:17.3,s:22.0},{i:317,t:16.1,s:22.0},{i:318,t:15.0,s:22.0},{i:319,t:14.0,s:22.0},{i:320,t:13.3,s:22.0},{i:321,t:12.6,s:22.0},{i:322,t:11.8,s:22.0},{i:323,t:10.4,s:22.0},{i:324,t:9.5,s:22.0},{i:325,t:9.6,s:22.0},{i:326,t:11.7,s:22.0},{i:327,t:15.0,s:22.0},{i:328,t:18.7,s:22.0},{i:329,t:22.6,s:22.0},{i:330,t:25.8,s:22.0},{i:331,t:28.3,s:22.0},{i:332,t:29.9,s:22.0},{i:333,t:30.7,s:22.0},{i:334,t:30.3,s:22.0},{i:335,t:28.9,s:22.0},{i:336,t:26.9,s:22.0},{i:337,t:23.5,s:22.0},{i:338,t:18.2,s:12.0},{i:339,t:15.1,s:12.0},{i:340,t:13.6,s:12.0},{i:341,t:12.4,s:12.0},{i:342,t:11.3,s:12.0},{i:343,t:10.5,s:10.0},{i:344,t:16.1,s:10.0},{i:345,t:14.8,s:10.0},{i:346,t:14.9,s:10.0},{i:347,t:14.1,s:10.0},{i:348,t:12.8,s:10.0},{i:349,t:13.3,s:10.0},{i:350,t:13.6,s:10.0},{i:351,t:13.5,s:10.0},{i:352,t:13.6,s:10.0},{i:353,t:13.6,s:10.0},{i:354,t:13.6,s:10.0},{i:355,t:13.6,s:10.0},{i:356,t:13.7,s:10.0},{i:357,t:13.8,s:10.0},{i:358,t:13.8,s:10.0},{i:359,t:13.9,s:10.0},{i:360,t:13.9,s:10.0},{i:361,t:13.9,s:10.0},{i:362,t:13.9,s:10.0},{i:363,t:13.9,s:10.0},{i:364,t:13.9,s:10.0},{i:365,t:13.9,s:10.0},{i:366,t:13.9,s:10.0},{i:367,t:13.9,s:10.0},{i:368,t:13.9,s:10.0},{i:369,t:13.9,s:10.0},{i:370,t:13.9,s:10.0},{i:371,t:13.9,s:10.0},{i:372,t:13.9,s:10.0},{i:373,t:13.9,s:10.0},{i:374,t:13.9,s:10.0},{i:375,t:13.9,s:10.0},{i:376,t:13.9,s:10.0},{i:377,t:13.7,s:10.0},{i:378,t:13.8,s:10.0},{i:379,t:13.9,s:10.0},{i:380,t:13.8,s:10.0},{i:381,t:13.8,s:10.0},{i:382,t:13.8,s:10.0},{i:383,t:14.0,s:10.0},{i:384,t:13.9,s:10.0},{i:385,t:13.8,s:10.0},{i:386,t:13.8,s:10.0},{i:387,t:13.8,s:10.0},{i:388,t:13.8,s:10.0},{i:389,t:13.7,s:10.0},{i:390,t:13.8,s:10.0},{i:391,t:13.7,s:10.0},{i:392,t:13.7,s:10.0},{i:393,t:13.7,s:10.0},{i:394,t:13.7,s:10.0},{i:395,t:13.7,s:10.0},{i:396,t:13.7,s:10.0},{i:397,t:13.7,s:9.5},{i:398,t:13.6,s:16.0},{i:399,t:15.3,s:16.0},{i:400,t:15.4,s:24.0},{i:401,t:15.4,s:24.0},{i:402,t:15.5,s:24.0},{i:403,t:15.6,s:24.0},{i:404,t:15.7,s:24.0},{i:405,t:15.8,s:24.0},{i:406,t:15.9,s:24.0},{i:407,t:15.9,s:24.0},{i:408,t:16.0,s:24.0},{i:409,t:16.0,s:24.0},{i:410,t:16.1,s:24.0},{i:411,t:16.1,s:24.0},{i:412,t:16.2,s:24.0},{i:413,t:16.3,s:24.0},{i:414,t:16.3,s:24.0},{i:415,t:16.3,s:24.0},{i:416,t:16.4,s:24.0},{i:417,t:16.5,s:24.0},{i:418,t:16.5,s:24.0},{i:419,t:16.6,s:24.0},{i:420,t:16.6,s:24.0},{i:421,t:16.6,s:24.0},{i:422,t:16.6,s:24.0},{i:423,t:16.7,s:24.0},{i:424,t:16.8,s:24.0},{i:425,t:16.9,s:24.0},{i:426,t:17.0,s:24.0},{i:427,t:17.1,s:24.0},{i:428,t:17.2,s:24.0},{i:429,t:17.4,s:24.0},{i:430,t:17.5,s:24.0},{i:431,t:17.6,s:24.0},{i:432,t:17.7,s:24.0},{i:433,t:17.7,s:24.0},{i:434,t:17.8,s:24.0},{i:435,t:17.9,s:24.0},{i:436,t:18.0,s:24.0},{i:437,t:18.0,s:24.0},{i:438,t:18.1,s:24.0},{i:439,t:18.1,s:24.0},{i:440,t:18.2,s:24.0},{i:441,t:18.2,s:24.0},{i:442,t:18.2,s:24.0},{i:443,t:18.3,s:24.0},{i:444,t:18.3,s:24.0},{i:445,t:18.3,s:24.0},{i:446,t:18.4,s:24.0},{i:447,t:18.5,s:24.0},{i:448,t:18.5,s:26.0},{i:449,t:18.7,s:26.0},{i:450,t:18.8,s:26.0},{i:451,t:18.9,s:26.0},{i:452,t:19.0,s:26.0},{i:453,t:19.2,s:26.0},{i:454,t:19.3,s:26.0},{i:455,t:19.4,s:26.0},{i:456,t:19.4,s:26.0},{i:457,t:19.5,s:26.0},{i:458,t:19.6,s:26.0},{i:459,t:19.6,s:26.0},{i:460,t:19.7,s:26.0},{i:461,t:19.8,s:26.0},{i:462,t:19.8,s:26.0},{i:463,t:20.0,s:26.0},{i:464,t:20.0,s:26.0},{i:465,t:20.1,s:26.0},{i:466,t:20.1,s:26.0},{i:467,t:20.1,s:26.0},{i:468,t:20.2,s:26.0},{i:469,t:20.3,s:26.0},{i:470,t:20.4,s:26.0},{i:471,t:20.4,s:26.0},{i:472,t:20.5,s:26.0},{i:473,t:20.7,s:26.0},{i:474,t:20.8,s:26.0},{i:475,t:21.0,s:26.0},{i:476,t:21.2,s:26.0},{i:477,t:21.3,s:26.0},{i:478,t:21.4,s:26.0},{i:479,t:21.4,s:26.0},{i:480,t:21.5,s:26.0},{i:481,t:21.6,s:26.0},{i:482,t:21.7,s:26.0},{i:483,t:21.7,s:26.0},{i:484,t:21.8,s:26.0},{i:485,t:21.8,s:26.0},{i:486,t:21.9,s:26.0},{i:487,t:22.0,s:26.0},{i:488,t:22.0,s:26.0},{i:489,t:22.0,s:26.0},{i:490,t:22.0,s:26.0},{i:491,t:22.0,s:26.0},{i:492,t:22.2,s:26.0},{i:493,t:22.2,s:26.0},{i:494,t:22.3,s:26.0},{i:495,t:22.3,s:26.0},{i:496,t:22.4,s:26.0},{i:497,t:22.5,s:26.0},{i:498,t:22.7,s:26.0},{i:499,t:22.9,s:26.0},{i:500,t:23.0,s:26.0},{i:501,t:23.0,s:26.0},{i:502,t:23.1,s:26.0},{i:503,t:23.2,s:26.0},{i:504,t:23.4,s:26.0},{i:505,t:23.4,s:26.0},{i:506,t:23.5,s:26.0},{i:507,t:23.5,s:26.0},{i:508,t:23.5,s:27.0},{i:509,t:23.6,s:27.0},{i:510,t:23.7,s:27.0},{i:511,t:23.7,s:27.0},{i:512,t:23.8,s:27.0},{i:513,t:23.8,s:27.0},{i:514,t:23.9,s:27.0},{i:515,t:23.9,s:27.0},{i:516,t:23.9,s:27.0},{i:517,t:23.9,s:27.0},{i:518,t:24.0,s:27.0},{i:519,t:24.0,s:27.0},{i:520,t:24.1,s:27.0},{i:521,t:24.2,s:27.0},{i:522,t:24.4,s:27.0},{i:523,t:24.5,s:27.0},{i:524,t:24.7,s:27.0},{i:525,t:25.4,s:27.0},{i:526,t:26.0,s:27.0},{i:527,t:26.9,s:27.0},{i:528,t:27.1,s:27.0},{i:529,t:27.2,s:27.0},{i:530,t:27.3,s:27.0},{i:531,t:27.4,s:27.0},{i:532,t:27.4,s:27.0},{i:533,t:27.5,s:27.0},{i:534,t:27.5,s:27.0},{i:535,t:27.5,s:27.0},{i:536,t:27.6,s:27.0},{i:537,t:27.6,s:27.0},{i:538,t:27.6,s:27.0},{i:539,t:27.6,s:27.0},{i:540,t:27.1,s:26.0},{i:541,t:26.5,s:26.0},{i:542,t:26.4,s:26.0},{i:543,t:26.4,s:26.0},{i:544,t:26.6,s:26.0},{i:545,t:26.6,s:26.0},{i:546,t:26.9,s:26.0},{i:547,t:26.9,s:26.0},{i:548,t:27.0,s:26.0},{i:549,t:27.2,s:26.0},{i:550,t:27.2,s:26.0},{i:551,t:27.3,s:26.0},{i:552,t:27.4,s:26.0},{i:553,t:27.4,s:26.0},{i:554,t:27.5,s:26.0},{i:555,t:27.5,s:26.0},{i:556,t:27.6,s:26.0},{i:557,t:27.6,s:26.0},{i:558,t:27.6,s:26.0},{i:559,t:27.6,s:26.0},{i:560,t:27.6,s:26.0},{i:561,t:27.7,s:26.0},{i:562,t:27.7,s:26.0},{i:563,t:27.6,s:26.0},{i:564,t:27.7,s:26.0},{i:565,t:27.7,s:26.0},{i:566,t:27.7,s:26.0},{i:567,t:27.8,s:26.0},{i:568,t:27.9,s:26.0},{i:569,t:27.9,s:26.0},{i:570,t:28.1,s:26.0},{i:571,t:28.2,s:26.0},{i:572,t:28.4,s:26.0},{i:573,t:28.3,s:26.0},{i:574,t:28.5,s:26.0},{i:575,t:28.5,s:26.0},{i:576,t:28.6,s:26.0},{i:577,t:28.6,s:26.0},{i:578,t:28.6,s:26.0},{i:579,t:28.6,s:26.0},{i:580,t:28.6,s:26.0},{i:581,t:28.6,s:26.0},{i:582,t:28.6,s:26.0},{i:583,t:28.6,s:26.0},{i:584,t:28.6,s:26.0},{i:585,t:28.6,s:26.0},{i:586,t:28.6,s:26.0},{i:587,t:28.6,s:26.0},{i:588,t:28.5,s:26.0},{i:589,t:28.6,s:26.0},{i:590,t:28.6,s:26.0},{i:591,t:28.6,s:26.0},{i:592,t:28.7,s:26.0},{i:593,t:28.7,s:26.0},{i:594,t:28.8,s:26.0},{i:595,t:28.9,s:26.0},{i:596,t:28.8,s:26.0},{i:597,t:29.1,s:26.0},{i:598,t:29.1,s:26.0},{i:599,t:29.1,s:26.0},{i:600,t:29.2,s:26.0},{i:601,t:29.2,s:26.0},{i:602,t:29.2,s:26.0},{i:603,t:29.2,s:26.0},{i:604,t:29.2,s:26.0},{i:605,t:29.2,s:26.0},{i:606,t:29.1,s:26.0},{i:607,t:29.1,s:26.0},{i:608,t:29.1,s:26.0},{i:609,t:29.1,s:26.0},{i:610,t:29.1,s:26.0},{i:611,t:29.0,s:26.0},{i:612,t:29.0,s:26.0},{i:613,t:29.0,s:26.0},{i:614,t:29.0,s:26.0},{i:615,t:29.1,s:26.0},{i:616,t:29.1,s:26.0},{i:617,t:29.1,s:26.0},{i:618,t:29.2,s:26.0},{i:619,t:29.3,s:26.0},{i:620,t:29.4,s:26.0},{i:621,t:29.4,s:26.0},{i:622,t:29.4,s:26.0},{i:623,t:29.5,s:26.0},{i:624,t:29.5,s:26.0},{i:625,t:29.5,s:26.0},{i:626,t:29.5,s:26.0},{i:627,t:29.5,s:26.0},{i:628,t:29.5,s:26.0},{i:629,t:28.9,s:26.0},{i:630,t:28.2,s:26.0},{i:631,t:27.8,s:26.0},{i:632,t:27.4,s:26.0},{i:633,t:26.9,s:26.0},{i:634,t:26.9,s:26.0},{i:635,t:27.0,s:26.0},{i:636,t:26.8,s:26.0},{i:637,t:26.8,s:26.0},{i:638,t:26.8,s:26.0},{i:639,t:26.8,s:26.0},{i:640,t:26.9,s:26.0},{i:641,t:26.9,s:26.0},{i:642,t:27.0,s:26.0},{i:643,t:27.0,s:26.0},{i:644,t:27.1,s:26.0},{i:645,t:27.1,s:26.0},{i:646,t:27.1,s:26.0},{i:647,t:27.2,s:26.0},{i:648,t:27.2,s:26.0},{i:649,t:27.2,s:26.0},{i:650,t:27.2,s:26.0},{i:651,t:26.9,s:26.0},{i:652,t:26.5,s:26.0},{i:653,t:26.3,s:26.0},{i:654,t:26.3,s:26.0},{i:655,t:26.3,s:26.0},{i:656,t:26.2,s:26.0},{i:657,t:26.2,s:26.0},{i:658,t:26.2,s:26.0},{i:659,t:26.0,s:26.0},{i:660,t:26.0,s:26.0},{i:661,t:26.0,s:26.0},{i:662,t:25.9,s:26.0},{i:663,t:25.9,s:26.0},{i:664,t:25.9,s:26.0},{i:665,t:25.9,s:26.0},{i:666,t:25.9,s:26.0},{i:667,t:25.9,s:26.0},{i:668,t:26.0,s:26.0},{i:669,t:26.0,s:26.0},{i:670,t:26.0,s:26.0},{i:671,t:25.9,s:26.0},{i:672,t:25.9,s:26.0},{i:673,t:25.9,s:26.0},{i:674,t:25.9,s:26.0},{i:675,t:25.9,s:26.0},{i:676,t:25.8,s:26.0},{i:677,t:25.8,s:26.0},{i:678,t:25.7,s:26.0},{i:679,t:25.7,s:26.0},{i:680,t:25.7,s:26.0},{i:681,t:25.7,s:26.0},{i:682,t:25.5,s:26.0},{i:683,t:25.2,s:26.0},{i:684,t:25.2,s:26.0},{i:685,t:25.2,s:26.0},{i:686,t:24.9,s:26.0},{i:687,t:25.0,s:26.0},{i:688,t:25.0,s:26.0},{i:689,t:25.0,s:26.0},{i:690,t:25.0,s:26.0},{i:691,t:25.0,s:26.0},{i:692,t:25.0,s:26.0},{i:693,t:25.0,s:26.0},{i:694,t:25.0,s:26.0},{i:695,t:24.9,s:26.0},{i:696,t:24.9,s:26.0},{i:697,t:24.8,s:26.0},{i:698,t:24.8,s:26.0},{i:699,t:24.7,s:26.0},{i:700,t:24.5,s:26.0},{i:701,t:24.5,s:26.0},{i:702,t:24.3,s:26.0},{i:703,t:24.3,s:26.0},{i:704,t:24.2,s:26.0},{i:705,t:24.1,s:26.0},{i:706,t:24.0,s:26.0},{i:707,t:23.9,s:26.0},{i:708,t:23.8,s:26.0},{i:709,t:23.7,s:26.0},{i:710,t:23.7,s:26.0},{i:711,t:23.6,s:26.0},{i:712,t:23.7,s:26.0},{i:713,t:23.8,s:26.0},{i:714,t:23.8,s:26.0},{i:715,t:23.8,s:26.0},{i:716,t:23.8,s:26.0},{i:717,t:23.9,s:26.0},{i:718,t:23.8,s:26.0},{i:719,t:23.9,s:26.0},{i:720,t:23.9,s:26.0},{i:721,t:23.8,s:26.0},{i:722,t:23.8,s:26.0},{i:723,t:23.7,s:26.0},{i:724,t:23.6,s:26.0},{i:725,t:23.5,s:26.0},{i:726,t:23.5,s:26.0},{i:727,t:23.4,s:26.0},{i:728,t:23.3,s:26.0},{i:729,t:23.2,s:26.0},{i:730,t:23.2,s:26.0},{i:731,t:23.1,s:26.0},{i:732,t:23.0,s:26.0},{i:733,t:23.0,s:26.0},{i:734,t:22.9,s:26.0},{i:735,t:22.9,s:26.0},{i:736,t:22.9,s:26.0},{i:737,t:22.9,s:26.0},{i:738,t:22.9,s:26.0},{i:739,t:23.0,s:26.0},{i:740,t:23.0,s:26.0},{i:741,t:23.0,s:26.0},{i:742,t:23.0,s:26.0},{i:743,t:23.0,s:26.0},{i:744,t:23.0,s:26.0},{i:745,t:22.9,s:26.0},{i:746,t:23.1,s:26.0},{i:747,t:23.5,s:26.0},{i:748,t:24.1,s:26.0},{i:749,t:24.7,s:26.0},{i:750,t:25.2,s:26.0},{i:751,t:25.5,s:26.0},{i:752,t:25.5,s:26.0},{i:753,t:25.5,s:26.0},{i:754,t:25.4,s:26.0},{i:755,t:25.3,s:26.0},{i:756,t:25.2,s:26.0},{i:757,t:25.1,s:26.0},{i:758,t:25.1,s:26.0},{i:759,t:25.1,s:26.0},{i:760,t:25.1,s:26.0},{i:761,t:25.1,s:26.0},{i:762,t:25.1,s:26.0},{i:763,t:25.1,s:26.0},{i:764,t:25.1,s:26.0},{i:765,t:25.1,s:26.0},{i:766,t:25.0,s:26.0},{i:767,t:25.0,s:26.0},{i:768,t:24.9,s:26.0},{i:769,t:24.9,s:26.0},{i:770,t:24.8,s:26.0},{i:771,t:24.7,s:26.0},{i:772,t:24.6,s:26.0},{i:773,t:24.6,s:26.0},{i:774,t:24.5,s:26.0},{i:775,t:24.5,s:26.0},{i:776,t:24.7,s:26.0},{i:777,t:24.7,s:26.0},{i:778,t:24.6,s:26.0},{i:779,t:24.5,s:26.0},{i:780,t:24.4,s:26.0}
];

// Narrative chapters keyed by data index thresholds
const CHAPTERS = [
  {
    from: 0, to: 289,
    phase: "PHASE 1 — TANK FILLING",
    color: "#f59e0b",
    text: "The tank is being filled over approximately 12 days. The temperature sensor is mounted at ¾ height — it reads ambient air temperature as the must rises. The sawtooth pattern reflects day/night ambient cycles, not fermentation activity. VinWizard records every reading throughout the entire filling process.",
  },
  {
    from: 290, to: 337,
    phase: "PHASE 2 — TANK FULL · FERMENTATION BEGINS",
    color: "#f97316",
    text: "Tank is now full. Active fermentation begins. Setpoint raised to 22°C. The cooling system is working but refrigerant capacity is not sufficient to fully reach the target. Temperature oscillations become less extreme as the must absorbs heat more evenly.",
  },
  {
    from: 338, to: 396,
    phase: "PHASE 3 — SETPOINT RAISED TO 22°C",
    color: "#a78bfa",
    text: "Winemaker raises the setpoint to 22°C. Fermentation activity is decreasing. Temperature oscillations become less extreme as sugar content drops and exothermic activity slows down.",
  },
  {
    from: 397, to: 447,
    phase: "PHASE 4 — AGGRESSIVE COOLING",
    color: "#38bdf8",
    text: "Setpoint dropped sharply to 12°C then 10°C. Cold valve opens. But the chiller is OFF — the valve is open but there's no cold to push. Temperature stabilises around 13.9°C, unable to reach target. VinWizard detects the gap and logs it.",
  },
  {
    from: 448, to: 539,
    phase: "PHASE 5 — CHILLER ACTIVATED",
    color: "#4ade80",
    text: "Chiller is finally switched on. Temperature drops sharply. Then cold valve closes — temperature falls below setpoint. The winemaker opens the heat valve: ambient is cold outside, the must needs warming. VinWizard manages both directions.",
  },
  {
    from: 540, to: 628,
    phase: "PHASE 6 — MALOLACTIC PREPARATION",
    color: "#fb7185",
    text: "Setpoint raised progressively to 24°C then 26°C then 27°C. This is the preparation for malolactic fermentation — the wine needs warmth. Temperature rises steadily and linearly. No more sawtooth: fermentation is complete.",
  },
  {
    from: 629, to: 780,
    phase: "PHASE 7 — TEMPERATURE EXCEEDANCE & STABILISATION",
    color: "#f43f5e",
    text: "Chiller is off again — temperature exceeds setpoint, reaching 29.5°C. Eventually the chiller activates: sharp drop to 26°C, then stable. The wine holds. 33 days of real data. Every decision logged. Every anomaly captured.",
  },
];

function getChapter(idx) {
  return CHAPTERS.find(c => idx >= c.from && idx <= c.to) || CHAPTERS[CHAPTERS.length - 1];
}

const TOTAL = RAW_DATA.length;
const INTERVAL_MS = 26;
const PHASE_PAUSE_MS = 5000;

export default function AC147Simulator() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);
  const chapter = getChapter(idx);
  const current = RAW_DATA[idx];
  const visibleData = RAW_DATA.slice(0, idx + 1);
  const progress = ((idx / (TOTAL - 1)) * 100).toFixed(1);
  const dayNum = (idx / 24).toFixed(1);

  const play = useCallback(() => {
    if (finished) { setIdx(0); setFinished(false); }
    setPlaying(true);
  }, [finished]);

  const pause = () => setPlaying(false);
  const reset = () => { setPlaying(false); setIdx(0); setFinished(false); };

  const pausingRef = useRef(false);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        if (pausingRef.current) return;
        setIdx(prev => {
          if (prev >= TOTAL - 1) {
            setPlaying(false);
            setFinished(true);
            return prev;
          }
          const next = prev + 1;
          const prevChapter = getChapter(prev);
          const nextChapter = getChapter(next);
          if (prevChapter.phase !== nextChapter.phase) {
            pausingRef.current = true;
            setTimeout(() => { pausingRef.current = false; }, PHASE_PAUSE_MS);
            return next; // advance to first point of new phase, then pause
          }
          return next;
        });
      }, INTERVAL_MS);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  const deviation = (current.t - current.s).toFixed(1);
  const deviationColor = Math.abs(deviation) < 1 ? "#4ade80" : Math.abs(deviation) < 3 ? "#f59e0b" : "#f43f5e";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#05080f",
      color: "#e2e8f0",
      fontFamily: "'Courier New', monospace",
      display: "flex",
      flexDirection: "column",
      padding: "20px 24px",
      boxSizing: "border-box",
      gap: 16,
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #1e3a5f", paddingBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, color: "#3b82f6", letterSpacing: 4, marginBottom: 2 }}>VINWIZARD · SMART TANK CONTROLLER</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", letterSpacing: 2 }}>TANK AC147</div>
          <div style={{ fontSize: 11, color: "#475569", letterSpacing: 1 }}>Mar 4, 2026 — Apr 6, 2026 · 781 hourly readings · REAL DATA</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "#475569", marginBottom: 4 }}>ELAPSED</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#3b82f6" }}>{dayNum}</div>
          <div style={{ fontSize: 10, color: "#475569" }}>DAYS</div>
        </div>
      </div>

      {/* Chapter banner */}
      <div style={{
        background: `${chapter.color}18`,
        border: `1px solid ${chapter.color}55`,
        borderLeft: `4px solid ${chapter.color}`,
        borderRadius: 8,
        padding: "12px 16px",
        transition: "all 0.5s ease",
      }}>
        <div style={{ fontSize: 10, color: chapter.color, letterSpacing: 3, marginBottom: 6 }}>{chapter.phase}</div>
        <div style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.6 }}>{chapter.text}</div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "TEMPERATURE", value: `${current.t}°C`, color: deviationColor },
          { label: "SETPOINT", value: `${current.s}°C`, color: "#3b82f6" },
          { label: "DEVIATION", value: `${deviation > 0 ? "+" : ""}${deviation}°C`, color: deviationColor },
          { label: "READING #", value: idx + 1, color: "#94a3b8" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#0d1929", border: "1px solid #1e3a5f", borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 9, color: "#475569", letterSpacing: 2, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ flex: 1, background: "#0d1929", border: "1px solid #1e3a5f", borderRadius: 10, padding: "16px 16px 8px 4px" }}>
        <div style={{ display: "flex", gap: 20, marginLeft: 16, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 2, background: "#f59e0b" }} />
            <span style={{ fontSize: 10, color: "#94a3b8" }}>Temperature (°C)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 2, background: "#3b82f6", borderTop: "2px dashed #3b82f6" }} />
            <span style={{ fontSize: 10, color: "#94a3b8" }}>Setpoint (°C)</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={visibleData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <XAxis dataKey="i" type="number" domain={[0, 780]} tickFormatter={v => `D${(v/24).toFixed(0)}`} stroke="#1e3a5f" tick={{ fill: "#475569", fontSize: 9 }} tickCount={12} />
            <YAxis domain={[5, 38]} stroke="#1e3a5f" tick={{ fill: "#475569", fontSize: 9 }} />
            <Tooltip
              contentStyle={{ background: "#0d1929", border: "1px solid #1e3a5f", borderRadius: 6, fontSize: 11 }}
              labelFormatter={v => `Hour ${v} (Day ${(v/24).toFixed(1)})`}
              formatter={(val, name) => [`${val}°C`, name === "t" ? "Temp" : "Setpoint"]}
            />
            <ReferenceLine x={idx} stroke={chapter.color} strokeWidth={1.5} strokeOpacity={0.6} />
            <Line type="monotone" dataKey="s" stroke="#3b82f6" dot={false} strokeWidth={1.5} strokeDasharray="5 3" name="Setpoint" />
            <Line type="monotone" dataKey="t" stroke="#f59e0b" dot={false} strokeWidth={2} name="Temperature" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Progress + Controls */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, background: "#0d1929", borderRadius: 4, height: 6, border: "1px solid #1e3a5f", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              background: `linear-gradient(90deg, #3b82f6, ${chapter.color})`,
              width: `${progress}%`,
              transition: "width 0.05s linear",
              borderRadius: 4,
            }} />
          </div>
          <span style={{ fontSize: 10, color: "#475569", minWidth: 38 }}>{progress}%</span>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {!playing ? (
            <button onClick={play} style={{
              background: "#1e3a5f", color: "#3b82f6", border: "1px solid #3b82f6",
              borderRadius: 6, padding: "10px 28px", fontSize: 13, cursor: "pointer", letterSpacing: 2, fontFamily: "inherit"
            }}>
              {finished ? "↺ REPLAY" : idx === 0 ? "▶ PLAY" : "▶ CONTINUE"}
            </button>
          ) : (
            <button onClick={pause} style={{
              background: "#1a1a2e", color: "#94a3b8", border: "1px solid #2d3748",
              borderRadius: 6, padding: "10px 28px", fontSize: 13, cursor: "pointer", letterSpacing: 2, fontFamily: "inherit"
            }}>
              ⏸ PAUSE
            </button>
          )}
          <button onClick={reset} style={{
            background: "transparent", color: "#475569", border: "1px solid #1e3a5f",
            borderRadius: 6, padding: "10px 16px", fontSize: 12, cursor: "pointer", fontFamily: "inherit"
          }}>
            ↺
          </button>

          {/* Chapter dots */}
          <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
            {CHAPTERS.map((c, i) => (
              <div key={i} title={c.phase} onClick={() => { setIdx(c.from); setFinished(false); }} style={{
                width: 10, height: 10, borderRadius: "50%",
                background: idx >= c.from && idx <= c.to ? c.color : `${c.color}40`,
                cursor: "pointer", transition: "all 0.3s",
                border: idx >= c.from && idx <= c.to ? `2px solid ${c.color}` : "2px solid transparent"
              }} />
            ))}
          </div>
          <span style={{ fontSize: 9, color: "#334155", marginLeft: 4 }}>click dots to jump to phase</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #0f2040", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 9, color: "#1e3a5f", letterSpacing: 2 }}>VINWIZARD STC · REAL FERMENTATION DATA · AC147 · 2026</div>
        <div style={{ fontSize: 9, color: "#1e3a5f" }}>WWW.VINWIZARD.COM</div>
      </div>
    </div>
  );
}
