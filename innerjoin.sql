--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 14.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category_tags; Type: TABLE; Schema: public; Owner: judyjiang
--

CREATE TABLE public.category_tags (
    category_tag_id integer NOT NULL,
    category_tag_name character varying NOT NULL,
    img_url character varying NOT NULL
);


ALTER TABLE public.category_tags OWNER TO judyjiang;

--
-- Name: category_tags_category_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: judyjiang
--

CREATE SEQUENCE public.category_tags_category_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_tags_category_tag_id_seq OWNER TO judyjiang;

--
-- Name: category_tags_category_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: judyjiang
--

ALTER SEQUENCE public.category_tags_category_tag_id_seq OWNED BY public.category_tags.category_tag_id;


--
-- Name: chat_room; Type: TABLE; Schema: public; Owner: judyjiang
--

CREATE TABLE public.chat_room (
    id integer NOT NULL,
    group_name character varying NOT NULL,
    category_name character varying NOT NULL
);


ALTER TABLE public.chat_room OWNER TO judyjiang;

--
-- Name: chat_room_id_seq; Type: SEQUENCE; Schema: public; Owner: judyjiang
--

CREATE SEQUENCE public.chat_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_room_id_seq OWNER TO judyjiang;

--
-- Name: chat_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: judyjiang
--

ALTER SEQUENCE public.chat_room_id_seq OWNED BY public.chat_room.id;


--
-- Name: chat_room_member; Type: TABLE; Schema: public; Owner: judyjiang
--

CREATE TABLE public.chat_room_member (
    id integer NOT NULL,
    room_id integer NOT NULL,
    user_id integer NOT NULL,
    last_speak bigint DEFAULT '-1'::bigint,
    last_seen bigint,
    joined_at bigint,
    is_online boolean DEFAULT true
);


ALTER TABLE public.chat_room_member OWNER TO judyjiang;

--
-- Name: chat_room_member_id_seq; Type: SEQUENCE; Schema: public; Owner: judyjiang
--

CREATE SEQUENCE public.chat_room_member_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_room_member_id_seq OWNER TO judyjiang;

--
-- Name: chat_room_member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: judyjiang
--

ALTER SEQUENCE public.chat_room_member_id_seq OWNED BY public.chat_room_member.id;


--
-- Name: chat_room_message; Type: TABLE; Schema: public; Owner: judyjiang
--

CREATE TABLE public.chat_room_message (
    id integer NOT NULL,
    room_id integer NOT NULL,
    sender_id integer NOT NULL,
    content character varying NOT NULL,
    created_at bigint
);


ALTER TABLE public.chat_room_message OWNER TO judyjiang;

--
-- Name: chat_room_message_id_seq; Type: SEQUENCE; Schema: public; Owner: judyjiang
--

CREATE SEQUENCE public.chat_room_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_room_message_id_seq OWNER TO judyjiang;

--
-- Name: chat_room_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: judyjiang
--

ALTER SEQUENCE public.chat_room_message_id_seq OWNED BY public.chat_room_message.id;


--
-- Name: group_tags; Type: TABLE; Schema: public; Owner: judyjiang
--

CREATE TABLE public.group_tags (
    group_tag_id integer NOT NULL,
    category_tag_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.group_tags OWNER TO judyjiang;

--
-- Name: group_tags_group_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: judyjiang
--

CREATE SEQUENCE public.group_tags_group_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group_tags_group_tag_id_seq OWNER TO judyjiang;

--
-- Name: group_tags_group_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: judyjiang
--

ALTER SEQUENCE public.group_tags_group_tag_id_seq OWNED BY public.group_tags.group_tag_id;


--
-- Name: groups; Type: TABLE; Schema: public; Owner: judyjiang
--

CREATE TABLE public.groups (
    group_id integer NOT NULL,
    group_name character varying NOT NULL
);


ALTER TABLE public.groups OWNER TO judyjiang;

--
-- Name: groups_group_id_seq; Type: SEQUENCE; Schema: public; Owner: judyjiang
--

CREATE SEQUENCE public.groups_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.groups_group_id_seq OWNER TO judyjiang;

--
-- Name: groups_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: judyjiang
--

ALTER SEQUENCE public.groups_group_id_seq OWNED BY public.groups.group_id;


--
-- Name: user_groups; Type: TABLE; Schema: public; Owner: judyjiang
--

CREATE TABLE public.user_groups (
    user_group_id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.user_groups OWNER TO judyjiang;

--
-- Name: user_groups_user_group_id_seq; Type: SEQUENCE; Schema: public; Owner: judyjiang
--

CREATE SEQUENCE public.user_groups_user_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_groups_user_group_id_seq OWNER TO judyjiang;

--
-- Name: user_groups_user_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: judyjiang
--

ALTER SEQUENCE public.user_groups_user_group_id_seq OWNED BY public.user_groups.user_group_id;


--
-- Name: user_tags; Type: TABLE; Schema: public; Owner: judyjiang
--

CREATE TABLE public.user_tags (
    user_tag_id integer NOT NULL,
    user_id integer NOT NULL,
    category_tag_id integer NOT NULL
);


ALTER TABLE public.user_tags OWNER TO judyjiang;

--
-- Name: user_tags_user_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: judyjiang
--

CREATE SEQUENCE public.user_tags_user_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_tags_user_tag_id_seq OWNER TO judyjiang;

--
-- Name: user_tags_user_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: judyjiang
--

ALTER SEQUENCE public.user_tags_user_tag_id_seq OWNED BY public.user_tags.user_tag_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: judyjiang
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    fname character varying NOT NULL,
    lname character varying NOT NULL,
    gender character varying,
    age integer,
    ethnicity character varying,
    occupation character varying,
    zipcode character varying
);


ALTER TABLE public.users OWNER TO judyjiang;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: judyjiang
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO judyjiang;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: judyjiang
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: category_tags category_tag_id; Type: DEFAULT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.category_tags ALTER COLUMN category_tag_id SET DEFAULT nextval('public.category_tags_category_tag_id_seq'::regclass);


--
-- Name: chat_room id; Type: DEFAULT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.chat_room ALTER COLUMN id SET DEFAULT nextval('public.chat_room_id_seq'::regclass);


--
-- Name: chat_room_member id; Type: DEFAULT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.chat_room_member ALTER COLUMN id SET DEFAULT nextval('public.chat_room_member_id_seq'::regclass);


--
-- Name: chat_room_message id; Type: DEFAULT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.chat_room_message ALTER COLUMN id SET DEFAULT nextval('public.chat_room_message_id_seq'::regclass);


--
-- Name: group_tags group_tag_id; Type: DEFAULT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.group_tags ALTER COLUMN group_tag_id SET DEFAULT nextval('public.group_tags_group_tag_id_seq'::regclass);


--
-- Name: groups group_id; Type: DEFAULT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.groups ALTER COLUMN group_id SET DEFAULT nextval('public.groups_group_id_seq'::regclass);


--
-- Name: user_groups user_group_id; Type: DEFAULT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.user_groups ALTER COLUMN user_group_id SET DEFAULT nextval('public.user_groups_user_group_id_seq'::regclass);


--
-- Name: user_tags user_tag_id; Type: DEFAULT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.user_tags ALTER COLUMN user_tag_id SET DEFAULT nextval('public.user_tags_user_tag_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: category_tags; Type: TABLE DATA; Schema: public; Owner: judyjiang
--

COPY public.category_tags (category_tag_id, category_tag_name, img_url) FROM stdin;
1	hobbies & interests	/static/img/hobbies & interests.jpg
2	cultural background	/static/img/cultural background.jpg
3	support groups	/static/img/support groups.jpg
4	current or past workplace(s)	/static/img/current or past workplace(s).jpg
5	current or past college(s) attended	/static/img/current or past college(s) attended.jpg
6	current or past high school(s) attended	/static/img/current or past high school(s) attended.jpg
\.


--
-- Data for Name: chat_room; Type: TABLE DATA; Schema: public; Owner: judyjiang
--

COPY public.chat_room (id, group_name, category_name) FROM stdin;
1	walmart	current or past workplace(s)
2	pacific islander	cultural background
\.


--
-- Data for Name: chat_room_member; Type: TABLE DATA; Schema: public; Owner: judyjiang
--

COPY public.chat_room_member (id, room_id, user_id, last_speak, last_seen, joined_at, is_online) FROM stdin;
1	1	100	-1	-1	1696877357736	f
2	1	103	-1	-1	1696877357736	f
3	1	107	-1	-1	1696877357736	f
7	1	125	-1	-1	1696877357736	f
8	1	130	-1	-1	1696877357736	f
9	1	133	-1	-1	1696877357736	f
10	1	148	-1	-1	1696877357736	f
11	1	168	-1	-1	1696877357736	f
12	1	171	-1	-1	1696877357736	f
13	1	176	-1	-1	1696877357736	f
14	1	178	-1	-1	1696877357736	f
15	1	192	-1	-1	1696877357736	f
16	1	193	-1	-1	1696877357736	f
17	1	194	-1	-1	1696877357736	f
18	1	196	-1	-1	1696877357736	f
19	1	198	-1	-1	1696877357736	f
21	2	54	-1	-1	1696878330520	f
22	2	60	-1	-1	1696878330520	f
23	2	103	-1	-1	1696878330520	f
24	2	114	-1	-1	1696878330520	f
25	2	164	-1	-1	1696878330520	f
26	2	172	-1	-1	1696878330520	f
27	2	200	-1	-1	1696878330520	f
6	1	122	1696877634912	1696877686725	1696877357736	f
28	2	201	1696878468213	1696878498686	1696878330520	f
20	1	201	-1	1696904037954	1696877357736	f
5	1	119	1696877644434	1696877865872	1696877357736	f
4	1	110	1696877616498	1696877671076	1696877357736	f
\.


--
-- Data for Name: chat_room_message; Type: TABLE DATA; Schema: public; Owner: judyjiang
--

COPY public.chat_room_message (id, room_id, sender_id, content, created_at) FROM stdin;
1	1	119	Hi everyone!	1696877445179
2	1	122	Hi Ricki!	1696877458009
3	1	110	Hello!	1696877466853
4	1	119	How is everyone doing?	1696877479226
5	1	122	I'm doing great!	1696877489196
6	1	119	How about we plan a casual movie get-together this weekend? It would be a great way to spend some time together and get to know each other better.	1696877512670
7	1	122	That's a wonderful idea! I'd love to join. What kind of movies are you into?	1696877526624
8	1	119	I enjoy a variety of genres, but how about we go for a light-hearted comedy or an adventure movie? Something that's enjoyable and not too intense for our first movie night.	1696877539818
9	1	110	Count me in! Comedy or adventure works for me too. Can't wait to hang out with you both!	1696877547876
10	1	122	Awesome! Let's decide on a specific movie and time. How about Saturday afternoon or evening?	1696877568146
11	1	119	Saturday evening works for me. What time are you both available?	1696877591751
12	1	110	Around 8:00 or 9:00 PM works great for me. We can grab some snacks, chill, and have a good time.	1696877616493
13	1	122	Perfect! Let's finalize the time and movie choice by Friday, and we can't forget the popcorn. Looking forward to meeting you both and having a fantastic movie night!	1696877634905
14	1	119	Sounds good!!	1696877644429
15	2	201	testing	1696878468210
\.


--
-- Data for Name: group_tags; Type: TABLE DATA; Schema: public; Owner: judyjiang
--

COPY public.group_tags (group_tag_id, category_tag_id, group_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	1	6
7	1	7
8	1	8
9	1	9
10	1	10
11	1	11
12	1	12
13	1	13
14	2	14
15	2	15
16	2	16
17	2	17
18	2	18
19	2	19
20	2	20
21	2	21
22	2	22
23	2	23
24	2	24
25	2	25
26	2	26
27	2	27
28	2	28
29	2	29
30	2	30
31	2	31
32	2	32
33	2	33
34	2	34
35	2	35
36	2	36
37	2	37
38	2	38
39	3	39
40	3	40
41	3	41
42	3	42
43	3	43
44	3	44
45	3	45
46	4	46
47	4	47
48	4	48
49	4	49
50	4	50
51	4	51
52	4	52
53	4	53
54	4	54
55	4	55
56	4	56
57	4	57
58	4	58
59	4	59
60	4	60
61	4	61
62	4	62
63	4	63
64	4	64
65	4	65
66	4	66
67	4	67
68	4	68
69	4	69
70	4	70
71	4	71
72	4	72
73	4	73
74	4	74
75	4	75
76	4	76
77	4	77
78	4	78
79	4	79
80	4	80
81	4	81
82	4	82
83	4	83
84	4	84
85	4	85
86	4	86
87	4	87
88	4	88
89	4	89
90	4	90
91	4	91
92	4	92
93	4	93
94	4	94
95	4	95
96	4	96
97	4	97
98	4	98
99	4	99
100	4	100
101	4	101
102	4	102
103	4	103
104	4	104
105	4	105
106	4	106
107	4	107
108	4	108
109	4	109
110	4	110
111	4	111
112	4	112
113	4	113
114	4	114
115	4	115
116	4	116
117	4	117
118	4	118
119	4	119
120	4	120
121	4	121
122	4	122
123	4	123
124	4	124
125	4	125
126	4	126
127	4	127
128	4	128
129	4	129
130	4	130
131	4	131
132	4	132
133	4	133
134	4	134
135	4	135
136	4	136
137	4	137
138	4	138
139	4	139
140	4	140
141	4	141
142	4	142
143	4	143
144	4	144
145	4	145
146	5	146
147	5	147
148	5	148
149	5	149
150	5	150
151	5	151
152	5	152
153	5	153
154	5	154
155	5	155
156	5	156
157	5	157
158	5	158
159	5	159
160	5	160
161	5	161
162	5	162
163	5	163
164	5	164
165	5	165
166	5	166
167	5	167
168	5	168
169	5	169
170	5	170
171	5	171
172	5	172
173	5	173
174	5	174
175	5	175
176	5	176
177	5	177
178	5	178
179	5	179
180	5	180
181	5	181
182	5	182
183	5	183
184	5	184
185	5	185
186	5	186
187	5	187
188	5	188
189	5	189
190	5	190
191	5	191
192	5	192
193	5	193
194	5	194
195	5	195
196	6	196
197	6	197
198	6	198
199	6	199
200	6	200
201	6	201
202	6	202
203	6	203
204	6	204
205	6	205
206	6	206
207	6	207
208	6	208
209	6	209
210	6	210
211	6	211
212	6	212
213	6	213
214	6	214
215	6	215
216	6	216
217	6	217
218	6	218
219	6	219
220	6	220
221	6	221
222	6	222
223	6	223
224	6	224
225	6	225
226	6	226
227	6	227
228	6	228
229	6	229
230	6	230
231	6	231
232	6	232
233	6	233
234	6	234
235	6	235
236	6	236
237	6	237
238	6	238
239	6	239
240	6	240
241	6	241
242	6	242
243	6	243
244	6	244
245	6	245
\.


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: judyjiang
--

COPY public.groups (group_id, group_name) FROM stdin;
1	reading
2	sports & fitness
3	music
4	gardening
5	cooking & baking
6	gaming
7	traveling
8	writing
9	collecting
10	diy & home improvement
11	cars
12	photography & film
13	arts & crafts
14	american
15	chinese
16	indian
17	spanish
18	japanese
19	russian
20	mexican
21	german
22	french
23	italian
24	british
25	brazilian
26	korean
27	canadian
28	australian
29	african
30	middle eastern
31	latin american
32	southeast asian
33	scandinavian
34	eastern european
35	arabic
36	jewish
37	indigenous
38	pacific islander
39	stress & anxiety
40	relationships
41	career and education
42	mental health
43	physical health
44	personal development
45	life events & transitions
46	walmart
47	amazon
48	exxon mobil
49	apple
50	unitedhealth group
51	cvs health
52	berkshire hathaway
53	alphabet
54	mckesson
55	chevron
56	amerisourcebergen
57	costco wholesale
58	microsoft 
59	cardinal health 
60	cigna
61	marathon petroleum
62	phillips 66
63	valero energy
64	ford motor
65	home depot
66	general motors
67	elevance health
68	jpmorgan chase
69	kroger
70	centene
71	verizon communications
72	walgreens boots
73	fannie mae
74	comcast
75	at&t
76	meta platforms
77	bank of america
78	target
79	dell technologies
80	archer daniels midland (adm)
81	citigroup
82	united parcel service
83	pfizer
84	lowe’s
85	johnson & johnson
86	fedex
87	humana
88	energy transfer
89	state farm insurance
90	freddie mac
91	pepsico
92	wells fargo
93	walt disney
94	conocophillips
95	tesla
96	procter & gamble
97	general electric
98	albertsons
99	metlife
100	goldman sachs group
101	sysco
102	raytheon technologies
103	boeing
104	stonex group
105	lockheed martin
106	morgan stanley
107	intel
108	hp
109	td synnex
110	international business machines
111	hca healthcare
112	prudential financial
113	caterpillar
114	merck
115	world fuel services
116	new york life insurance
117	enterprise products partners
118	abbvie
119	plains gp holdings
120	dow
121	aig
122	american express
123	publix super markets
124	charter communications
125	tyson foods
126	deere
127	cisco systems
128	nationwide
129	delta airlines
130	delta air lines
131	liberty mutual insurance group
132	tjx
133	progressive
134	american airlines group
135	chs
136	performance food group
137	pbf energy
138	nike
139	best buy
140	bristol-myers squibb
141	united airlines holdings 
142	thermo fisher scientific
143	qualcomm
144	abbott laboratories
145	coca-cola
146	massachusetts institute of technology
147	stanford university
148	duke university
149	university of pennsylvania
150	northwestern university
151	claremont mckenna college
152	university of chicago
153	carnegie mellon university
154	johns hopkins university
155	princeton university
156	brown university
157	harvard university
158	cornell university
159	columbia university in the city of new york
160	yale university
161	university of notre dame
162	university of california - berkeley
163	university of southern california
164	georgetown university
165	bowdoin college
166	vanderbilt university
167	dartmouth college
168	rice university
169	washington university in st louis
170	university of michigan - ann arbor
171	georgia institute of technology - main campus
172	williams college
173	california institute of technology
174	university of california - los angeles
175	new york university
176	harvey mudd college
177	university of virginia - main campus
178	university of wisconsin - madison
179	tufts university
180	emory university
181	university of maryland - college park
182	lehigh university
183	university of washington - seattle campus
184	colgate university
185	george washington university
186	boston university
187	teachers college at columbia university
188	university of north carolina at chapel hill
189	university of illinois at urbana-champaign
190	boston college
191	pomona college
192	purdue university - main campus
193	virginia tech
194	university of california - san diego
195	university of california - santa barbara
196	academy at the lakes
197	arlington catholic high school
198	army & navy academy
199	ben lippen school
200	besant hill school
201	buffalo seminary school
202	colorado rocky mountain school
203	darlington school
204	emma willard school
205	fay school 
206	florida prep
207	fryeburg academy
208	grier school
209	hawai'i preparatory academy
210	hebron academy
211	idyllwild arts academy
212	interlochen arts academy
213	kent school
214	lake mary preparatory school
215	lake forest academy
216	la lumiere school
217	lyndon institute
218	lincoln academy
219	maine central institute
220	matignon high school
221	montverde academy
222	norwich free academy
223	northfield mount hermon school
224	oakwood friends school
225	orme school
226	phillips academy
227	phillips exeter academy
228	saint andrew's school
229	san domenico school
230	southwestern academy
231	st. croix academy
232	stevenson school
233	stoneleigh-burnham school
234	tallulah falls school
235	the athenian school
236	the brook hill school
237	the cambridge school of weston
238	the hun school of princeton
239	the northwest school
240	verde valley school
241	vanguard school
242	thornton academy
243	the webb school
244	wisconsin lutheran high school
245	wilbraham & monson academy
\.


--
-- Data for Name: user_groups; Type: TABLE DATA; Schema: public; Owner: judyjiang
--

COPY public.user_groups (user_group_id, user_id, group_id) FROM stdin;
1	1	2
2	1	4
3	1	31
4	1	44
5	1	39
6	1	106
7	1	178
8	1	201
9	2	3
10	2	13
11	2	23
12	2	45
13	2	39
14	2	47
15	2	159
16	2	224
17	3	5
18	3	13
19	3	15
20	3	43
21	3	44
22	3	111
23	3	192
24	3	234
25	4	7
26	4	10
27	4	14
28	4	43
29	4	41
30	4	68
31	4	177
32	4	204
33	5	13
34	5	3
35	5	22
36	5	39
37	5	43
38	5	86
39	5	186
40	5	227
41	6	13
42	6	5
43	6	19
44	6	41
45	6	43
46	6	68
47	6	162
48	6	197
49	7	8
50	7	3
51	7	26
52	7	42
53	7	39
54	7	68
55	7	167
56	7	231
57	8	9
58	8	7
59	8	37
60	8	45
61	8	43
62	8	116
63	8	179
64	8	217
65	9	12
66	9	3
67	9	31
68	9	45
69	9	39
70	9	108
71	9	171
72	9	198
73	10	1
74	10	13
75	10	31
76	10	39
77	10	41
78	10	80
79	10	181
80	10	231
81	11	11
82	11	12
83	11	21
84	11	39
85	11	41
86	11	77
87	11	163
88	11	236
89	12	4
90	12	7
91	12	30
92	12	43
93	12	45
94	12	161
95	12	234
96	13	10
97	13	9
98	13	27
99	13	41
100	13	39
101	13	78
102	13	177
103	13	231
104	14	13
105	14	10
106	14	31
107	14	43
108	14	44
109	14	107
110	14	167
111	14	218
112	15	9
113	15	3
114	15	29
115	15	44
116	15	39
117	15	90
118	15	179
119	15	237
120	16	7
121	16	9
122	16	22
123	16	43
124	16	44
125	16	99
126	16	154
127	16	232
128	17	11
129	17	12
130	17	34
131	17	43
132	17	42
133	17	101
134	17	185
135	17	223
136	18	12
137	18	13
138	18	19
139	18	41
140	18	40
141	18	101
142	18	155
143	18	221
144	19	12
145	19	1
146	19	37
147	19	42
148	19	44
149	19	116
150	19	183
151	19	202
152	20	8
153	20	11
154	20	27
155	20	42
156	20	44
157	20	74
158	20	192
159	20	238
160	21	8
161	21	3
162	21	33
163	21	43
164	21	40
165	21	62
166	21	193
167	21	236
168	22	8
169	22	6
170	22	22
171	22	45
172	22	41
173	22	81
174	22	148
175	22	235
176	23	7
177	23	11
178	23	14
179	23	45
180	23	41
181	23	103
182	23	148
183	23	218
184	24	3
185	24	2
186	24	35
187	24	40
188	24	41
189	24	82
190	24	190
191	24	245
192	25	8
193	25	10
194	25	22
195	25	44
196	25	40
197	25	104
198	25	163
199	25	203
200	26	6
201	26	3
202	26	36
203	26	45
204	26	43
205	26	79
206	26	166
207	26	227
208	27	4
209	27	6
210	27	18
211	27	40
212	27	44
213	27	106
214	27	154
215	27	213
216	28	1
217	28	9
218	28	24
219	28	43
220	28	39
221	28	105
222	28	165
223	28	210
224	29	11
225	29	5
226	29	25
227	29	41
228	29	40
229	29	114
230	29	160
231	29	233
232	30	7
233	30	10
234	30	34
235	30	41
236	30	43
237	30	51
238	30	148
239	30	199
240	31	5
241	31	3
242	31	37
243	31	39
244	31	43
245	31	108
246	31	190
247	31	237
248	32	10
249	32	3
250	32	23
251	32	44
252	32	43
253	32	90
254	32	179
255	32	206
256	33	4
257	33	12
258	33	19
259	33	43
260	33	41
261	33	81
262	33	157
263	33	222
264	34	4
265	34	10
266	34	33
267	34	39
268	34	41
269	34	86
270	34	192
271	34	216
272	35	9
273	35	10
274	35	26
275	35	44
276	35	42
277	35	72
278	35	175
279	35	229
280	36	13
281	36	6
282	36	36
283	36	42
284	36	41
285	36	79
286	36	160
287	36	212
288	37	12
289	37	5
290	37	35
291	37	39
292	37	43
293	37	66
294	37	147
295	37	208
296	38	10
297	38	2
298	38	37
299	38	40
300	38	44
301	38	87
302	38	150
303	38	202
304	39	4
305	39	1
306	39	23
307	39	40
308	39	42
309	39	90
310	39	187
311	39	214
312	40	12
313	40	7
314	40	22
315	40	44
316	40	45
317	40	104
318	40	152
319	40	234
320	41	11
321	41	2
322	41	16
323	41	39
324	41	43
325	41	178
326	41	216
327	42	7
328	42	10
329	42	18
330	42	41
331	42	42
332	42	109
333	42	167
334	42	223
335	43	5
336	43	6
337	43	24
338	43	44
339	43	39
340	43	111
341	43	180
342	43	215
343	44	4
344	44	13
345	44	19
346	44	45
347	44	40
348	44	62
349	44	164
350	44	245
351	45	10
352	45	12
353	45	24
354	45	40
355	45	45
356	45	93
357	45	171
358	45	225
359	46	2
360	46	10
361	46	26
362	46	40
363	46	42
364	46	195
365	46	228
366	47	4
367	47	13
368	47	17
369	47	45
370	47	39
371	47	92
372	47	195
373	47	222
374	48	2
375	48	9
376	48	32
377	48	45
378	48	44
379	48	114
380	48	185
381	48	197
382	49	9
383	49	7
384	49	19
385	49	45
386	49	43
387	49	79
388	49	189
389	49	224
390	50	6
391	50	4
392	50	24
393	50	41
394	50	42
395	50	69
396	50	176
397	50	209
398	51	1
399	51	4
400	51	14
401	51	39
402	51	44
403	51	79
404	51	186
405	51	223
406	52	12
407	52	3
408	52	15
409	52	44
410	52	39
411	52	115
412	52	166
413	52	216
414	53	10
415	53	5
416	53	17
417	53	41
418	53	39
419	53	57
420	53	176
421	54	2
422	54	9
423	54	38
424	54	42
425	54	44
426	54	57
427	54	161
428	54	200
429	55	13
430	55	12
431	55	20
432	55	39
433	55	42
434	55	104
435	55	184
436	55	241
437	56	4
438	56	6
439	56	15
440	56	40
441	56	41
442	56	53
443	56	153
444	56	236
445	57	5
446	57	11
447	57	28
448	57	41
449	57	39
450	57	105
451	57	194
452	57	215
453	58	6
454	58	10
455	58	22
456	58	44
457	58	40
458	58	80
459	58	174
460	58	213
461	59	5
462	59	12
463	59	27
464	59	45
465	59	43
466	59	70
467	59	186
468	59	217
469	60	5
470	60	11
471	60	38
472	60	41
473	60	45
474	60	52
475	60	151
476	60	207
477	61	6
478	61	2
479	61	15
480	61	44
481	61	42
482	61	101
483	61	153
484	61	219
485	62	5
486	62	8
487	62	21
488	62	43
489	62	39
490	62	67
491	62	183
492	62	237
493	63	8
494	63	6
495	63	18
496	63	39
497	63	43
498	63	98
499	63	183
500	63	210
501	64	11
502	64	10
503	64	26
504	64	41
505	64	39
506	64	50
507	64	183
508	64	244
509	65	4
510	65	5
511	65	21
512	65	43
513	65	41
514	65	62
515	65	195
516	65	222
517	66	1
518	66	5
519	66	36
520	66	39
521	66	44
522	66	117
523	66	170
524	66	210
525	67	2
526	67	5
527	67	33
528	67	42
529	67	39
530	67	51
531	67	193
532	67	219
533	68	6
534	68	13
535	68	14
536	68	44
537	68	45
538	68	49
539	68	179
540	68	220
541	69	7
542	69	10
543	69	19
544	69	41
545	69	42
546	69	66
547	69	148
548	69	215
549	70	8
550	70	10
551	70	29
552	70	39
553	70	44
554	70	83
555	70	171
556	70	224
557	71	6
558	71	3
559	71	33
560	71	45
561	71	42
562	71	60
563	71	184
564	71	242
565	72	6
566	72	2
567	72	31
568	72	43
569	72	39
570	72	49
571	72	190
572	72	198
573	73	11
574	73	3
575	73	15
576	73	41
577	73	44
578	73	96
579	73	186
580	73	202
581	74	3
582	74	7
583	74	30
584	74	41
585	74	44
586	74	83
587	74	181
588	74	199
589	75	8
590	75	5
591	75	27
592	75	45
593	75	42
594	75	112
595	75	154
596	75	201
597	76	10
598	76	5
599	76	14
600	76	39
601	76	42
602	76	72
603	76	150
604	76	210
605	77	11
606	77	12
607	77	22
608	77	44
609	77	39
610	77	55
611	77	167
612	77	240
613	78	3
614	78	4
615	78	36
616	78	43
617	78	39
618	78	111
619	78	165
620	78	214
621	79	11
622	79	1
623	79	37
624	79	43
625	79	41
626	79	173
627	79	243
628	80	1
629	80	3
630	80	25
631	80	40
632	80	42
633	80	51
634	80	148
635	80	203
636	81	5
637	81	1
638	81	15
639	81	42
640	81	44
641	81	235
642	82	9
643	82	8
644	82	20
645	82	42
646	82	40
647	82	104
648	82	191
649	82	243
650	83	6
651	83	5
652	83	26
653	83	42
654	83	43
655	83	104
656	83	156
657	83	241
658	84	13
659	84	10
660	84	35
661	84	45
662	84	40
663	84	72
664	84	166
665	84	219
666	85	6
667	85	1
668	85	33
669	85	45
670	85	43
671	85	52
672	85	208
673	86	9
674	86	11
675	86	31
676	86	42
677	86	45
678	86	57
679	86	187
680	86	238
681	87	4
682	87	12
683	87	27
684	87	42
685	87	41
686	87	171
687	87	199
688	88	2
689	88	4
690	88	22
691	88	41
692	88	43
693	88	104
694	88	181
695	88	214
696	89	12
697	89	1
698	89	23
699	89	44
700	89	43
701	89	101
702	89	186
703	89	236
704	90	10
705	90	5
706	90	32
707	90	41
708	90	39
709	90	50
710	90	150
711	90	234
712	91	6
713	91	13
714	91	28
715	91	45
716	91	44
717	91	111
718	91	160
719	91	241
720	92	3
721	92	5
722	92	25
723	92	44
724	92	41
725	92	68
726	92	173
727	92	208
728	93	13
729	93	11
730	93	26
731	93	40
732	93	45
733	93	178
734	93	197
735	94	4
736	94	11
737	94	17
738	94	41
739	94	40
740	94	70
741	94	200
742	95	10
743	95	11
744	95	22
745	95	44
746	95	45
747	95	79
748	95	175
749	95	236
750	96	1
751	96	7
752	96	16
753	96	42
754	96	44
755	96	66
756	96	151
757	96	229
758	97	7
759	97	5
760	97	16
761	97	43
762	97	40
763	97	86
764	97	157
765	97	223
766	98	3
767	98	1
768	98	15
769	98	43
770	98	42
771	98	75
772	98	177
773	98	222
774	99	13
775	99	12
776	99	16
777	99	42
778	99	39
779	99	105
780	99	171
781	99	201
782	100	4
783	100	9
784	100	27
785	100	40
786	100	39
787	100	46
788	100	161
789	100	197
790	101	11
791	101	13
792	101	24
793	101	43
794	101	42
795	101	71
796	101	170
797	101	222
798	102	12
799	102	3
800	102	17
801	102	43
802	102	39
803	102	98
804	102	156
805	102	237
806	103	6
807	103	7
808	103	38
809	103	44
810	103	39
811	103	46
812	103	155
813	103	210
814	104	13
815	104	9
816	104	20
817	104	43
818	104	39
819	104	47
820	104	213
821	105	5
822	105	12
823	105	15
824	105	41
825	105	45
826	105	56
827	105	180
828	105	197
829	106	9
830	106	7
831	106	15
832	106	44
833	106	42
834	106	85
835	106	177
836	106	224
837	107	2
838	107	8
839	107	15
840	107	43
841	107	40
842	107	47
843	107	46
844	107	166
845	107	231
846	108	13
847	108	4
848	108	14
849	108	45
850	108	43
851	108	86
852	108	168
853	108	212
854	109	11
855	109	2
856	109	27
857	109	45
858	109	42
859	109	195
860	109	241
861	110	11
862	110	10
863	110	35
864	110	41
865	110	40
866	110	67
867	110	46
868	110	166
869	110	236
870	111	11
871	111	1
872	111	19
873	111	41
874	111	45
875	111	96
876	111	162
877	111	242
878	112	1
879	112	13
880	112	24
881	112	45
882	112	41
883	112	66
884	112	182
885	112	243
886	113	9
887	113	2
888	113	27
889	113	43
890	113	44
891	113	89
892	113	176
893	113	233
894	114	11
895	114	7
896	114	38
897	114	43
898	114	45
899	114	65
900	114	149
901	114	232
902	115	9
903	115	3
904	115	29
905	115	45
906	115	43
907	115	88
908	115	182
909	115	216
910	116	4
911	116	6
912	116	18
913	116	45
914	116	39
915	116	79
916	116	179
917	116	227
918	117	12
919	117	8
920	117	20
921	117	41
922	117	40
923	117	75
924	117	187
925	117	215
926	118	4
927	118	10
928	118	27
929	118	41
930	118	45
931	118	189
932	118	208
933	119	8
934	119	13
935	119	25
936	119	45
937	119	40
938	119	53
939	119	46
940	119	153
941	119	235
942	120	5
943	120	3
944	120	22
945	120	44
946	120	45
947	120	89
948	120	178
949	120	241
950	121	7
951	121	9
952	121	16
953	121	40
954	121	45
955	121	65
956	121	178
957	121	200
958	122	3
959	122	9
960	122	31
961	122	42
962	122	39
963	122	102
964	122	46
965	122	154
966	122	202
967	123	11
968	123	2
969	123	18
970	123	41
971	123	40
972	123	47
973	123	151
974	123	227
975	124	6
976	124	2
977	124	35
978	124	45
979	124	44
980	124	117
981	124	194
982	124	225
983	125	9
984	125	3
985	125	19
986	125	42
987	125	44
988	125	89
989	125	46
990	125	161
991	125	221
992	126	5
993	126	7
994	126	16
995	126	44
996	126	42
997	126	99
998	126	150
999	126	206
1000	127	8
1001	127	5
1002	127	22
1003	127	43
1004	127	45
1005	127	82
1006	127	180
1007	127	233
1008	128	3
1009	128	10
1010	128	17
1011	128	43
1012	128	42
1013	128	54
1014	128	168
1015	128	236
1016	129	13
1017	129	2
1018	129	36
1019	129	44
1020	129	41
1021	129	68
1022	129	188
1023	129	219
1024	130	11
1025	130	3
1026	130	15
1027	130	41
1028	130	44
1029	130	109
1030	130	46
1031	130	156
1032	130	236
1033	131	11
1034	131	2
1035	131	30
1036	131	45
1037	131	44
1038	131	74
1039	131	183
1040	131	219
1041	132	9
1042	132	13
1043	132	23
1044	132	42
1045	132	45
1046	132	81
1047	132	151
1048	132	225
1049	133	3
1050	133	7
1051	133	18
1052	133	39
1053	133	43
1054	133	101
1055	133	46
1056	133	165
1057	133	231
1058	134	7
1059	134	2
1060	134	23
1061	134	42
1062	134	41
1063	134	114
1064	134	176
1065	134	221
1066	135	2
1067	135	8
1068	135	34
1069	135	39
1070	135	43
1071	135	73
1072	135	192
1073	135	226
1074	136	2
1075	136	12
1076	136	21
1077	136	42
1078	136	41
1079	136	77
1080	136	178
1081	136	219
1082	137	13
1083	137	7
1084	137	32
1085	137	42
1086	137	39
1087	137	99
1088	137	155
1089	137	212
1090	138	9
1091	138	1
1092	138	19
1093	138	45
1094	138	39
1095	138	96
1096	138	189
1097	138	229
1098	139	7
1099	139	9
1100	139	32
1101	139	41
1102	139	42
1103	139	166
1104	139	198
1105	140	1
1106	140	6
1107	140	28
1108	140	43
1109	140	42
1110	140	116
1111	140	187
1112	140	225
1113	141	13
1114	141	7
1115	141	20
1116	141	43
1117	141	45
1118	141	109
1119	141	186
1120	141	216
1121	142	3
1122	142	10
1123	142	14
1124	142	43
1125	142	41
1126	142	76
1127	142	174
1128	142	202
1129	143	7
1130	143	9
1131	143	21
1132	143	43
1133	143	41
1134	143	80
1135	143	164
1136	143	223
1137	144	9
1138	144	7
1139	144	25
1140	144	45
1141	144	39
1142	144	108
1143	144	184
1144	145	1
1145	145	4
1146	145	17
1147	145	45
1148	145	43
1149	145	70
1150	145	168
1151	145	233
1152	146	9
1153	146	6
1154	146	20
1155	146	40
1156	146	39
1157	146	70
1158	146	156
1159	146	245
1160	147	3
1161	147	2
1162	147	31
1163	147	41
1164	147	44
1165	147	66
1166	147	164
1167	147	204
1168	148	13
1169	148	11
1170	148	24
1171	148	40
1172	148	43
1173	148	46
1174	148	157
1175	148	232
1176	149	5
1177	149	4
1178	149	32
1179	149	40
1180	149	42
1181	149	92
1182	149	193
1183	149	222
1184	150	5
1185	150	13
1186	150	23
1187	150	43
1188	150	40
1189	150	63
1190	150	186
1191	150	228
1192	151	13
1193	151	9
1194	151	22
1195	151	45
1196	151	39
1197	151	52
1198	151	195
1199	151	234
1200	152	2
1201	152	11
1202	152	27
1203	152	42
1204	152	44
1205	152	178
1206	152	196
1207	153	6
1208	153	1
1209	153	35
1210	153	39
1211	153	44
1212	153	90
1213	153	180
1214	153	221
1215	154	3
1216	154	12
1217	154	27
1218	154	41
1219	154	39
1220	154	110
1221	154	180
1222	154	221
1223	155	13
1224	155	12
1225	155	33
1226	155	41
1227	155	43
1228	155	52
1229	155	161
1230	155	212
1231	156	12
1232	156	9
1233	156	19
1234	156	41
1235	156	43
1236	156	117
1237	156	188
1238	156	211
1239	157	4
1240	157	5
1241	157	19
1242	157	41
1243	157	45
1244	157	47
1245	157	193
1246	157	226
1247	158	2
1248	158	13
1249	158	15
1250	158	41
1251	158	42
1252	158	174
1253	158	198
1254	159	13
1255	159	5
1256	159	29
1257	159	42
1258	159	39
1259	159	110
1260	159	181
1261	159	208
1262	160	7
1263	160	9
1264	160	32
1265	160	40
1266	160	44
1267	160	108
1268	160	164
1269	160	238
1270	161	13
1271	161	5
1272	161	23
1273	161	44
1274	161	41
1275	161	103
1276	161	156
1277	161	211
1278	162	11
1279	162	12
1280	162	30
1281	162	40
1282	162	39
1283	162	78
1284	162	174
1285	162	245
1286	163	2
1287	163	8
1288	163	31
1289	163	45
1290	163	39
1291	163	74
1292	163	184
1293	163	237
1294	164	8
1295	164	12
1296	164	38
1297	164	42
1298	164	44
1299	164	88
1300	164	189
1301	164	240
1302	165	7
1303	165	4
1304	165	33
1305	165	41
1306	165	45
1307	165	86
1308	165	195
1309	165	243
1310	166	8
1311	166	1
1312	166	28
1313	166	42
1314	166	39
1315	166	165
1316	166	218
1317	167	8
1318	167	9
1319	167	28
1320	167	45
1321	167	43
1322	167	111
1323	167	194
1324	167	227
1325	168	12
1326	168	7
1327	168	22
1328	168	44
1329	168	40
1330	168	93
1331	168	46
1332	168	153
1333	168	229
1334	169	11
1335	169	8
1336	169	37
1337	169	39
1338	169	45
1339	169	83
1340	169	184
1341	170	12
1342	170	13
1343	170	35
1344	170	45
1345	170	41
1346	170	110
1347	170	159
1348	170	239
1349	171	5
1350	171	11
1351	171	31
1352	171	41
1353	171	45
1354	171	46
1355	171	176
1356	171	207
1357	172	10
1358	172	7
1359	172	38
1360	172	42
1361	172	40
1362	172	109
1363	172	169
1364	172	219
1365	173	2
1366	173	9
1367	173	16
1368	173	40
1369	173	39
1370	173	170
1371	174	3
1372	174	11
1373	174	27
1374	174	45
1375	174	41
1376	174	109
1377	174	147
1378	174	201
1379	175	5
1380	175	11
1381	175	28
1382	175	39
1383	175	44
1384	175	79
1385	175	154
1386	175	197
1387	176	10
1388	176	4
1389	176	18
1390	176	43
1391	176	42
1392	176	106
1393	176	46
1394	176	151
1395	176	206
1396	177	1
1397	177	3
1398	177	16
1399	177	45
1400	177	44
1401	177	155
1402	177	203
1403	178	11
1404	178	1
1405	178	29
1406	178	44
1407	178	42
1408	178	85
1409	178	46
1410	178	185
1411	178	219
1412	179	6
1413	179	4
1414	179	24
1415	179	41
1416	179	44
1417	179	91
1418	179	182
1419	179	215
1420	180	9
1421	180	1
1422	180	31
1423	180	40
1424	180	43
1425	180	81
1426	180	151
1427	180	242
1428	181	6
1429	181	1
1430	181	32
1431	181	45
1432	181	40
1433	181	100
1434	181	179
1435	182	8
1436	182	10
1437	182	29
1438	182	41
1439	182	40
1440	182	63
1441	182	174
1442	182	222
1443	183	6
1444	183	5
1445	183	23
1446	183	43
1447	183	45
1448	183	49
1449	183	197
1450	184	2
1451	184	8
1452	184	16
1453	184	41
1454	184	43
1455	184	96
1456	184	149
1457	184	241
1458	185	5
1459	185	13
1460	185	37
1461	185	40
1462	185	39
1463	185	162
1464	185	213
1465	186	7
1466	186	6
1467	186	34
1468	186	43
1469	186	41
1470	186	117
1471	186	181
1472	186	225
1473	187	12
1474	187	7
1475	187	28
1476	187	40
1477	187	44
1478	187	98
1479	187	167
1480	187	199
1481	188	8
1482	188	5
1483	188	29
1484	188	41
1485	188	42
1486	188	111
1487	188	186
1488	188	237
1489	189	10
1490	189	11
1491	189	23
1492	189	42
1493	189	39
1494	189	105
1495	189	176
1496	189	241
1497	190	1
1498	190	4
1499	190	32
1500	190	43
1501	190	39
1502	190	57
1503	190	181
1504	190	241
1505	191	13
1506	191	12
1507	191	24
1508	191	41
1509	191	45
1510	191	68
1511	191	154
1512	191	230
1513	192	9
1514	192	13
1515	192	19
1516	192	40
1517	192	42
1518	192	103
1519	192	46
1520	192	181
1521	192	213
1522	193	11
1523	193	5
1524	193	16
1525	193	40
1526	193	43
1527	193	55
1528	193	46
1529	193	153
1530	194	4
1531	194	11
1532	194	25
1533	194	40
1534	194	41
1535	194	82
1536	194	46
1537	194	192
1538	194	222
1539	195	2
1540	195	11
1541	195	33
1542	195	41
1543	195	44
1544	195	114
1545	195	165
1546	195	231
1547	196	8
1548	196	11
1549	196	27
1550	196	39
1551	196	44
1552	196	88
1553	196	46
1554	196	166
1555	196	202
1556	197	13
1557	197	4
1558	197	21
1559	197	44
1560	197	42
1561	197	107
1562	197	155
1563	197	218
1564	198	4
1565	198	7
1566	198	15
1567	198	43
1568	198	41
1569	198	66
1570	198	46
1571	198	177
1572	198	224
1573	199	1
1574	199	13
1575	199	14
1576	199	43
1577	199	40
1578	199	110
1579	199	193
1580	199	236
1581	200	1
1582	200	9
1583	200	38
1584	200	44
1585	200	39
1586	200	110
1587	200	157
1588	200	208
1589	201	1
1590	201	12
1591	201	2
1592	201	38
1593	201	44
1594	201	41
1595	201	46
1596	201	157
1597	201	208
\.


--
-- Data for Name: user_tags; Type: TABLE DATA; Schema: public; Owner: judyjiang
--

COPY public.user_tags (user_tag_id, user_id, category_tag_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	1	6
7	2	1
8	2	2
9	2	3
10	2	4
11	2	5
12	2	6
13	3	1
14	3	2
15	3	3
16	3	4
17	3	5
18	3	6
19	4	1
20	4	2
21	4	3
22	4	4
23	4	5
24	4	6
25	5	1
26	5	2
27	5	3
28	5	4
29	5	5
30	5	6
31	6	1
32	6	2
33	6	3
34	6	4
35	6	5
36	6	6
37	7	1
38	7	2
39	7	3
40	7	4
41	7	5
42	7	6
43	8	1
44	8	2
45	8	3
46	8	4
47	8	5
48	8	6
49	9	1
50	9	2
51	9	3
52	9	4
53	9	5
54	9	6
55	10	1
56	10	2
57	10	3
58	10	4
59	10	5
60	10	6
61	11	1
62	11	2
63	11	3
64	11	4
65	11	5
66	11	6
67	12	1
68	12	2
69	12	3
70	12	4
71	12	5
72	12	6
73	13	1
74	13	2
75	13	3
76	13	4
77	13	5
78	13	6
79	14	1
80	14	2
81	14	3
82	14	4
83	14	5
84	14	6
85	15	1
86	15	2
87	15	3
88	15	4
89	15	5
90	15	6
91	16	1
92	16	2
93	16	3
94	16	4
95	16	5
96	16	6
97	17	1
98	17	2
99	17	3
100	17	4
101	17	5
102	17	6
103	18	1
104	18	2
105	18	3
106	18	4
107	18	5
108	18	6
109	19	1
110	19	2
111	19	3
112	19	4
113	19	5
114	19	6
115	20	1
116	20	2
117	20	3
118	20	4
119	20	5
120	20	6
121	21	1
122	21	2
123	21	3
124	21	4
125	21	5
126	21	6
127	22	1
128	22	2
129	22	3
130	22	4
131	22	5
132	22	6
133	23	1
134	23	2
135	23	3
136	23	4
137	23	5
138	23	6
139	24	1
140	24	2
141	24	3
142	24	4
143	24	5
144	24	6
145	25	1
146	25	2
147	25	3
148	25	4
149	25	5
150	25	6
151	26	1
152	26	2
153	26	3
154	26	4
155	26	5
156	26	6
157	27	1
158	27	2
159	27	3
160	27	4
161	27	5
162	27	6
163	28	1
164	28	2
165	28	3
166	28	4
167	28	5
168	28	6
169	29	1
170	29	2
171	29	3
172	29	4
173	29	5
174	29	6
175	30	1
176	30	2
177	30	3
178	30	4
179	30	5
180	30	6
181	31	1
182	31	2
183	31	3
184	31	4
185	31	5
186	31	6
187	32	1
188	32	2
189	32	3
190	32	4
191	32	5
192	32	6
193	33	1
194	33	2
195	33	3
196	33	4
197	33	5
198	33	6
199	34	1
200	34	2
201	34	3
202	34	4
203	34	5
204	34	6
205	35	1
206	35	2
207	35	3
208	35	4
209	35	5
210	35	6
211	36	1
212	36	2
213	36	3
214	36	4
215	36	5
216	36	6
217	37	1
218	37	2
219	37	3
220	37	4
221	37	5
222	37	6
223	38	1
224	38	2
225	38	3
226	38	4
227	38	5
228	38	6
229	39	1
230	39	2
231	39	3
232	39	4
233	39	5
234	39	6
235	40	1
236	40	2
237	40	3
238	40	4
239	40	5
240	40	6
241	41	1
242	41	2
243	41	3
244	41	4
245	41	5
246	41	6
247	42	1
248	42	2
249	42	3
250	42	4
251	42	5
252	42	6
253	43	1
254	43	2
255	43	3
256	43	4
257	43	5
258	43	6
259	44	1
260	44	2
261	44	3
262	44	4
263	44	5
264	44	6
265	45	1
266	45	2
267	45	3
268	45	4
269	45	5
270	45	6
271	46	1
272	46	2
273	46	3
274	46	4
275	46	5
276	46	6
277	47	1
278	47	2
279	47	3
280	47	4
281	47	5
282	47	6
283	48	1
284	48	2
285	48	3
286	48	4
287	48	5
288	48	6
289	49	1
290	49	2
291	49	3
292	49	4
293	49	5
294	49	6
295	50	1
296	50	2
297	50	3
298	50	4
299	50	5
300	50	6
301	51	1
302	51	2
303	51	3
304	51	4
305	51	5
306	51	6
307	52	1
308	52	2
309	52	3
310	52	4
311	52	5
312	52	6
313	53	1
314	53	2
315	53	3
316	53	4
317	53	5
318	53	6
319	54	1
320	54	2
321	54	3
322	54	4
323	54	5
324	54	6
325	55	1
326	55	2
327	55	3
328	55	4
329	55	5
330	55	6
331	56	1
332	56	2
333	56	3
334	56	4
335	56	5
336	56	6
337	57	1
338	57	2
339	57	3
340	57	4
341	57	5
342	57	6
343	58	1
344	58	2
345	58	3
346	58	4
347	58	5
348	58	6
349	59	1
350	59	2
351	59	3
352	59	4
353	59	5
354	59	6
355	60	1
356	60	2
357	60	3
358	60	4
359	60	5
360	60	6
361	61	1
362	61	2
363	61	3
364	61	4
365	61	5
366	61	6
367	62	1
368	62	2
369	62	3
370	62	4
371	62	5
372	62	6
373	63	1
374	63	2
375	63	3
376	63	4
377	63	5
378	63	6
379	64	1
380	64	2
381	64	3
382	64	4
383	64	5
384	64	6
385	65	1
386	65	2
387	65	3
388	65	4
389	65	5
390	65	6
391	66	1
392	66	2
393	66	3
394	66	4
395	66	5
396	66	6
397	67	1
398	67	2
399	67	3
400	67	4
401	67	5
402	67	6
403	68	1
404	68	2
405	68	3
406	68	4
407	68	5
408	68	6
409	69	1
410	69	2
411	69	3
412	69	4
413	69	5
414	69	6
415	70	1
416	70	2
417	70	3
418	70	4
419	70	5
420	70	6
421	71	1
422	71	2
423	71	3
424	71	4
425	71	5
426	71	6
427	72	1
428	72	2
429	72	3
430	72	4
431	72	5
432	72	6
433	73	1
434	73	2
435	73	3
436	73	4
437	73	5
438	73	6
439	74	1
440	74	2
441	74	3
442	74	4
443	74	5
444	74	6
445	75	1
446	75	2
447	75	3
448	75	4
449	75	5
450	75	6
451	76	1
452	76	2
453	76	3
454	76	4
455	76	5
456	76	6
457	77	1
458	77	2
459	77	3
460	77	4
461	77	5
462	77	6
463	78	1
464	78	2
465	78	3
466	78	4
467	78	5
468	78	6
469	79	1
470	79	2
471	79	3
472	79	4
473	79	5
474	79	6
475	80	1
476	80	2
477	80	3
478	80	4
479	80	5
480	80	6
481	81	1
482	81	2
483	81	3
484	81	4
485	81	5
486	81	6
487	82	1
488	82	2
489	82	3
490	82	4
491	82	5
492	82	6
493	83	1
494	83	2
495	83	3
496	83	4
497	83	5
498	83	6
499	84	1
500	84	2
501	84	3
502	84	4
503	84	5
504	84	6
505	85	1
506	85	2
507	85	3
508	85	4
509	85	5
510	85	6
511	86	1
512	86	2
513	86	3
514	86	4
515	86	5
516	86	6
517	87	1
518	87	2
519	87	3
520	87	4
521	87	5
522	87	6
523	88	1
524	88	2
525	88	3
526	88	4
527	88	5
528	88	6
529	89	1
530	89	2
531	89	3
532	89	4
533	89	5
534	89	6
535	90	1
536	90	2
537	90	3
538	90	4
539	90	5
540	90	6
541	91	1
542	91	2
543	91	3
544	91	4
545	91	5
546	91	6
547	92	1
548	92	2
549	92	3
550	92	4
551	92	5
552	92	6
553	93	1
554	93	2
555	93	3
556	93	4
557	93	5
558	93	6
559	94	1
560	94	2
561	94	3
562	94	4
563	94	5
564	94	6
565	95	1
566	95	2
567	95	3
568	95	4
569	95	5
570	95	6
571	96	1
572	96	2
573	96	3
574	96	4
575	96	5
576	96	6
577	97	1
578	97	2
579	97	3
580	97	4
581	97	5
582	97	6
583	98	1
584	98	2
585	98	3
586	98	4
587	98	5
588	98	6
589	99	1
590	99	2
591	99	3
592	99	4
593	99	5
594	99	6
595	100	1
596	100	2
597	100	3
598	100	4
599	100	5
600	100	6
601	101	1
602	101	2
603	101	3
604	101	4
605	101	5
606	101	6
607	102	1
608	102	2
609	102	3
610	102	4
611	102	5
612	102	6
613	103	1
614	103	2
615	103	3
616	103	4
617	103	5
618	103	6
619	104	1
620	104	2
621	104	3
622	104	4
623	104	5
624	104	6
625	105	1
626	105	2
627	105	3
628	105	4
629	105	5
630	105	6
631	106	1
632	106	2
633	106	3
634	106	4
635	106	5
636	106	6
637	107	1
638	107	2
639	107	3
640	107	4
641	107	5
642	107	6
643	108	1
644	108	2
645	108	3
646	108	4
647	108	5
648	108	6
649	109	1
650	109	2
651	109	3
652	109	4
653	109	5
654	109	6
655	110	1
656	110	2
657	110	3
658	110	4
659	110	5
660	110	6
661	111	1
662	111	2
663	111	3
664	111	4
665	111	5
666	111	6
667	112	1
668	112	2
669	112	3
670	112	4
671	112	5
672	112	6
673	113	1
674	113	2
675	113	3
676	113	4
677	113	5
678	113	6
679	114	1
680	114	2
681	114	3
682	114	4
683	114	5
684	114	6
685	115	1
686	115	2
687	115	3
688	115	4
689	115	5
690	115	6
691	116	1
692	116	2
693	116	3
694	116	4
695	116	5
696	116	6
697	117	1
698	117	2
699	117	3
700	117	4
701	117	5
702	117	6
703	118	1
704	118	2
705	118	3
706	118	4
707	118	5
708	118	6
709	119	1
710	119	2
711	119	3
712	119	4
713	119	5
714	119	6
715	120	1
716	120	2
717	120	3
718	120	4
719	120	5
720	120	6
721	121	1
722	121	2
723	121	3
724	121	4
725	121	5
726	121	6
727	122	1
728	122	2
729	122	3
730	122	4
731	122	5
732	122	6
733	123	1
734	123	2
735	123	3
736	123	4
737	123	5
738	123	6
739	124	1
740	124	2
741	124	3
742	124	4
743	124	5
744	124	6
745	125	1
746	125	2
747	125	3
748	125	4
749	125	5
750	125	6
751	126	1
752	126	2
753	126	3
754	126	4
755	126	5
756	126	6
757	127	1
758	127	2
759	127	3
760	127	4
761	127	5
762	127	6
763	128	1
764	128	2
765	128	3
766	128	4
767	128	5
768	128	6
769	129	1
770	129	2
771	129	3
772	129	4
773	129	5
774	129	6
775	130	1
776	130	2
777	130	3
778	130	4
779	130	5
780	130	6
781	131	1
782	131	2
783	131	3
784	131	4
785	131	5
786	131	6
787	132	1
788	132	2
789	132	3
790	132	4
791	132	5
792	132	6
793	133	1
794	133	2
795	133	3
796	133	4
797	133	5
798	133	6
799	134	1
800	134	2
801	134	3
802	134	4
803	134	5
804	134	6
805	135	1
806	135	2
807	135	3
808	135	4
809	135	5
810	135	6
811	136	1
812	136	2
813	136	3
814	136	4
815	136	5
816	136	6
817	137	1
818	137	2
819	137	3
820	137	4
821	137	5
822	137	6
823	138	1
824	138	2
825	138	3
826	138	4
827	138	5
828	138	6
829	139	1
830	139	2
831	139	3
832	139	4
833	139	5
834	139	6
835	140	1
836	140	2
837	140	3
838	140	4
839	140	5
840	140	6
841	141	1
842	141	2
843	141	3
844	141	4
845	141	5
846	141	6
847	142	1
848	142	2
849	142	3
850	142	4
851	142	5
852	142	6
853	143	1
854	143	2
855	143	3
856	143	4
857	143	5
858	143	6
859	144	1
860	144	2
861	144	3
862	144	4
863	144	5
864	144	6
865	145	1
866	145	2
867	145	3
868	145	4
869	145	5
870	145	6
871	146	1
872	146	2
873	146	3
874	146	4
875	146	5
876	146	6
877	147	1
878	147	2
879	147	3
880	147	4
881	147	5
882	147	6
883	148	1
884	148	2
885	148	3
886	148	4
887	148	5
888	148	6
889	149	1
890	149	2
891	149	3
892	149	4
893	149	5
894	149	6
895	150	1
896	150	2
897	150	3
898	150	4
899	150	5
900	150	6
901	151	1
902	151	2
903	151	3
904	151	4
905	151	5
906	151	6
907	152	1
908	152	2
909	152	3
910	152	4
911	152	5
912	152	6
913	153	1
914	153	2
915	153	3
916	153	4
917	153	5
918	153	6
919	154	1
920	154	2
921	154	3
922	154	4
923	154	5
924	154	6
925	155	1
926	155	2
927	155	3
928	155	4
929	155	5
930	155	6
931	156	1
932	156	2
933	156	3
934	156	4
935	156	5
936	156	6
937	157	1
938	157	2
939	157	3
940	157	4
941	157	5
942	157	6
943	158	1
944	158	2
945	158	3
946	158	4
947	158	5
948	158	6
949	159	1
950	159	2
951	159	3
952	159	4
953	159	5
954	159	6
955	160	1
956	160	2
957	160	3
958	160	4
959	160	5
960	160	6
961	161	1
962	161	2
963	161	3
964	161	4
965	161	5
966	161	6
967	162	1
968	162	2
969	162	3
970	162	4
971	162	5
972	162	6
973	163	1
974	163	2
975	163	3
976	163	4
977	163	5
978	163	6
979	164	1
980	164	2
981	164	3
982	164	4
983	164	5
984	164	6
985	165	1
986	165	2
987	165	3
988	165	4
989	165	5
990	165	6
991	166	1
992	166	2
993	166	3
994	166	4
995	166	5
996	166	6
997	167	1
998	167	2
999	167	3
1000	167	4
1001	167	5
1002	167	6
1003	168	1
1004	168	2
1005	168	3
1006	168	4
1007	168	5
1008	168	6
1009	169	1
1010	169	2
1011	169	3
1012	169	4
1013	169	5
1014	169	6
1015	170	1
1016	170	2
1017	170	3
1018	170	4
1019	170	5
1020	170	6
1021	171	1
1022	171	2
1023	171	3
1024	171	4
1025	171	5
1026	171	6
1027	172	1
1028	172	2
1029	172	3
1030	172	4
1031	172	5
1032	172	6
1033	173	1
1034	173	2
1035	173	3
1036	173	4
1037	173	5
1038	173	6
1039	174	1
1040	174	2
1041	174	3
1042	174	4
1043	174	5
1044	174	6
1045	175	1
1046	175	2
1047	175	3
1048	175	4
1049	175	5
1050	175	6
1051	176	1
1052	176	2
1053	176	3
1054	176	4
1055	176	5
1056	176	6
1057	177	1
1058	177	2
1059	177	3
1060	177	4
1061	177	5
1062	177	6
1063	178	1
1064	178	2
1065	178	3
1066	178	4
1067	178	5
1068	178	6
1069	179	1
1070	179	2
1071	179	3
1072	179	4
1073	179	5
1074	179	6
1075	180	1
1076	180	2
1077	180	3
1078	180	4
1079	180	5
1080	180	6
1081	181	1
1082	181	2
1083	181	3
1084	181	4
1085	181	5
1086	181	6
1087	182	1
1088	182	2
1089	182	3
1090	182	4
1091	182	5
1092	182	6
1093	183	1
1094	183	2
1095	183	3
1096	183	4
1097	183	5
1098	183	6
1099	184	1
1100	184	2
1101	184	3
1102	184	4
1103	184	5
1104	184	6
1105	185	1
1106	185	2
1107	185	3
1108	185	4
1109	185	5
1110	185	6
1111	186	1
1112	186	2
1113	186	3
1114	186	4
1115	186	5
1116	186	6
1117	187	1
1118	187	2
1119	187	3
1120	187	4
1121	187	5
1122	187	6
1123	188	1
1124	188	2
1125	188	3
1126	188	4
1127	188	5
1128	188	6
1129	189	1
1130	189	2
1131	189	3
1132	189	4
1133	189	5
1134	189	6
1135	190	1
1136	190	2
1137	190	3
1138	190	4
1139	190	5
1140	190	6
1141	191	1
1142	191	2
1143	191	3
1144	191	4
1145	191	5
1146	191	6
1147	192	1
1148	192	2
1149	192	3
1150	192	4
1151	192	5
1152	192	6
1153	193	1
1154	193	2
1155	193	3
1156	193	4
1157	193	5
1158	193	6
1159	194	1
1160	194	2
1161	194	3
1162	194	4
1163	194	5
1164	194	6
1165	195	1
1166	195	2
1167	195	3
1168	195	4
1169	195	5
1170	195	6
1171	196	1
1172	196	2
1173	196	3
1174	196	4
1175	196	5
1176	196	6
1177	197	1
1178	197	2
1179	197	3
1180	197	4
1181	197	5
1182	197	6
1183	198	1
1184	198	2
1185	198	3
1186	198	4
1187	198	5
1188	198	6
1189	199	1
1190	199	2
1191	199	3
1192	199	4
1193	199	5
1194	199	6
1195	200	1
1196	200	2
1197	200	3
1198	200	4
1199	200	5
1200	200	6
1201	201	1
1202	201	2
1203	201	3
1204	201	4
1205	201	5
1206	201	6
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: judyjiang
--

COPY public.users (user_id, username, email, password, fname, lname, gender, age, ethnicity, occupation, zipcode) FROM stdin;
1	jgumly0	jgumly0@baidu.com	$2b$12$mriZ2oOGg0SkjKzQEJpjju7GHEQTId1R9c5Dz44Z7hynMfXjzDFhq	Jo-anne	Gumly	Female	60	Hispanic or Latino	Web Designer	27601
2	rbrakespear1	rbrakespear1@wisc.edu	$2b$12$E3hWvXTWZUR9mo9Vpad3AunHAyEYTMlFbR06FF8FC2NyPLFSJNSFG	Richy	Brakespear	Male	55	Hispanic or Latino	Software Developer	87101
3	iedwick2	iedwick2@google.nl	$2b$12$qecWYKFll3R0yTBF2eF5GO9qLD/hDDYl0XUXJ8nUJpWAftMbfJOsC	Irvin	Edwick	Male	42	White	Doctor	84101
4	lkinghorne3	lkinghorne3@weibo.com	$2b$12$J/nD7gcSt3RJdPcODXM6GOk9znqz6zB/dISj0u3LJqgyjnpBU2i1i	Lynn	Kinghorne	Female	52	White	Human Resources Manager	70112
5	dsedworth4	dsedworth4@apple.com	$2b$12$F5L99ySrAa1qpIFYjCn15ezQCDKCtviQxWHW3E5M1wXsyqPCE9a72	Dee dee	Sedworth	Female	57	Native Hawaiian or Other Pacific Islander	Civil Engineer	30301
6	acarnalan5	acarnalan5@ucla.edu	$2b$12$xnZ4HvSB.DiJz15sOPATW.sxw9of53tS8NCyJyIisdf82ogg3eKFy	Augustus	Carnalan	Male	55	American Indian or Alaska Native	Pharmacist	02101
7	achmiel6	achmiel6@harvard.edu	$2b$12$xtDWSNpl6RwpjZGH4wmmoOss5DjO5/S.KFqcPnbQbkugIGE6Qhoz.	Alleyn	Chmiel	Male	38	Native Hawaiian or Other Pacific Islander	Administrative Assistant	97201
8	abenitti7	abenitti7@unc.edu	$2b$12$BmWq3cizieYnPkJQC/0IYO.U.8wLkvJ9uaW.7QLpxQk5G9dLwoJxe	Arlina	Benitti	Female	25	Asian	Accountant	63101
9	athorburn8	athorburn8@tinypic.com	$2b$12$iPj1fegRjIfobvyrVcakV.kj.HPIWasRdNIJt7Caa0sEOcT8qg.ZC	Antonino	Thorburn	Male	25	Black or African American	Doctor	43201
10	kmcfaul9	kmcfaul9@comcast.net	$2b$12$D5EQWMrzzKcgVIav.REfSuMfxFp7IT4Vu9/FB/r/CHq5uxLdm/uCG	Kareem	Mc Faul	Agender	51	Black or African American	Civil Engineer	87101
11	clinkletera	clinkletera@slideshare.net	$2b$12$Hnk/OsHeDBaqEHbznxsm.O6J3euD0hrdgc4186msedVENfAuGZ416	Carter	Linkleter	Male	33	Native Hawaiian or Other Pacific Islander	Web Designer	02101
12	stotterdellb	stotterdellb@addthis.com	$2b$12$HnwAweCtd8TngQ9UQ70pE.23IFWjC.7EajAmdsyHb6DJ2.YxgFX3K	Shelley	Totterdell	Bigender	21	Asian	Chef	27601
13	rgerretsenc	rgerretsenc@wikipedia.org	$2b$12$wVud1X2FRddXDFbDETeCL.2hcC2NtxdaguwIaqHUfiUqD/XBoJEIa	Roger	Gerretsen	Male	34	Native Hawaiian or Other Pacific Islander	Nurse Practitioner	63101
14	clarrattd	clarrattd@sitemeter.com	$2b$12$oPWZX2SEnRYbBLlyBJzl2O2yT/URaI.ju.8tak1OaoEEWlYXEcDeq	Cullie	Larratt	Male	58	White	Electrician	02101
15	rboysone	rboysone@nature.com	$2b$12$IFIs5TW9FVEvCYlew6KtiOVr08Y6ro2ccAzxmlc4/ku3x0ahJsuee	Rachael	Boyson	Female	25	White	Graphic Designer	98101
16	ajefferyf	ajefferyf@zdnet.com	$2b$12$ReFZfbzgPNXopR5fdHVV8u5GHuYco9qm0IgKeOKbug9tOvJgH/Owy	Adelice	Jeffery	Female	30	Black or African American	Human Resources Manager	19101
17	gmcalisterg	gmcalisterg@qq.com	$2b$12$nfG2mCgjHT7UWNJc5hO9uu952rtSdA0IJXbQccgZmLqX/0WunD.V.	Gaspar	McAlister	Male	25	Native Hawaiian or Other Pacific Islander	Doctor	97201
18	mdunnicoh	mdunnicoh@guardian.co.uk	$2b$12$DUnZDrw2koWTvdF9ofCjduqWS1tv1cykxYNTXtT58UA/ZtZfcmn5i	Moira	Dunnico	Female	46	Other	Other	30301
19	tduerdeni	tduerdeni@i2i.jp	$2b$12$YUT4CzqFvTSqLP3n9F7seu9Yj.c1UQ56KD1823gAQU/34HfpNvRY2	Townsend	Duerden	Male	22	Hispanic or Latino	Marketing Manager	27601
20	cchewj	cchewj@mozilla.com	$2b$12$ozXiuFYxAE2lCf5NCG1ZxeWChz2jWJiH9Cy0YUAqaeRZ.yEHamXRC	Caye	Chew	Female	25	American Indian or Alaska Native	Accountant	21201
21	edaffeyk	edaffeyk@jiathis.com	$2b$12$FcMLsOHEtZhgov0b4agFVuCuhbMDy7QsBYQEiR5a9iGwDlrn3zqOG	Elaine	Daffey	Female	24	Hispanic or Latino	Financial Analyst	97201
22	bklimentovl	bklimentovl@wordpress.org	$2b$12$06BSZjf/0lNElMqzNK0lJ.eCQkLxDOsfHRijgO7CIwSqPTtajNmGW	Barbe	Klimentov	Genderfluid	40	Hispanic or Latino	Teacher	30301
23	mpickthornm	mpickthornm@technorati.com	$2b$12$1oijcoWI4xGqs0AvctAWae4RnA3cHH5b.RFKYKOyhKxcTub2jCzGu	Malissia	Pickthorn	Female	31	Native Hawaiian or Other Pacific Islander	Software Developer	73101
24	lkilgourn	lkilgourn@example.com	$2b$12$gJLUnXnuybHPzmJ9COV7n.D4ehoeI9A9qJU.1lKjIFcJ7fgIvl0ZS	Leontyne	Kilgour	Female	57	American Indian or Alaska Native	Accountant	92101
25	jsarjanto	jsarjanto@bizjournals.com	$2b$12$zEUwhN59Usqfg2.jvY/QoO6QZmbGPR9eVpwhajD9nNpgY8Ceysuy2	Jacquie	Sarjant	Genderqueer	35	Native Hawaiian or Other Pacific Islander	Writer	63101
26	meamp	meamp@photobucket.com	$2b$12$3NwyaeNBAOrRL7e/eWIoL.T.bY3cEzwUKyOLmI5kaBX43Gtl6BAdW	Mariya	Eam	Female	35	Hispanic or Latino	Web Designer	96801
27	ddulanyq	ddulanyq@dell.com	$2b$12$0K1mrCVKTDUeapR52TbsSeW5BhpQmU50ofzVLgbNH1mw9id5ikewm	Dreddy	Dulany	Female	25	Asian	Chef	85001
28	ckupecr	ckupecr@cafepress.com	$2b$12$XWyDuxOuuVbup4OwzGG57etIje7vWYcauPPVqIQ5jDCt71FrpH1xu	Calvin	Kupec	Male	59	Black or African American	Electrician	48201
29	fcopyns	fcopyns@cisco.com	$2b$12$MtMHGryQlyHEh3iRG7WO4ep.Kiz.msFCpJypQEZ/YLRTGDTKJQVFy	Forbes	Copyn	Agender	39	Black or African American	Other	84101
30	maubrayt	maubrayt@webmd.com	$2b$12$fUyOCOKRSpZrQFt2gn0XX.GQ2sueFN.PkFs/FmvT8lW4qxYloHgyy	Minetta	Aubray	Female	38	American Indian or Alaska Native	Nurse Practitioner	92101
31	etoffanou	etoffanou@weibo.com	$2b$12$J/ffIIyACfxJl38wb57WsOvdfogxq/GLrxVSTa5EnjJ5lmMc0TyJm	Eugenio	Toffano	Male	22	Asian	Other	63101
32	sliepmannv	sliepmannv@linkedin.com	$2b$12$eaG67bH1Ill1p/MckimK2u51gSam284XjtUAOorc.Xjgv5hqts4R2	Susette	Liepmann	Female	50	White	Human Resources Manager	33101
33	sgrandw	sgrandw@flickr.com	$2b$12$vCo4B4zQlCzt8LSLwDGDfe8dborSWRSErmokBDW/.79U7S6QAa1M6	Solomon	Grand	Male	24	Asian	Writer	37201
34	rraittx	rraittx@t.co	$2b$12$.v0LEYCIiwVSfrPYAm1lDuVJ9nbYsXMAdiJuydaFd/hiNu0se9Tpy	Rustin	Raitt	Male	40	Native Hawaiian or Other Pacific Islander	Electrician	37201
35	tpassmorey	tpassmorey@symantec.com	$2b$12$fDUnWIBO7fbLpdIVqNRPx.3/5.Cs1./nonkbJ5iBg9ytr/tDTgVja	Thain	Passmore	Male	39	Black or African American	Sales Representative	92101
36	svaneyz	svaneyz@chron.com	$2b$12$Q7qEvxPrzp/Mt.IG13OMEOOXlwP39U41NzLwZEE3N3y55/EkXZnei	Stanfield	Vaney	Male	55	American Indian or Alaska Native	Electrician	84101
37	rmatusevich10	rmatusevich10@free.fr	$2b$12$kbqP20dP9lfajTvSQWcI3u/lJ4Ud8j67TlLdCPrye5RBCqhNioDIi	Ronni	Matusevich	Genderfluid	37	Native Hawaiian or Other Pacific Islander	Teacher	80201
38	lkornilyev11	lkornilyev11@ucoz.com	$2b$12$BJ6csJAYZadbDdameFwiVOndxyoHb76Q2R7SzxqFYmmlBmpxVgweG	Lemuel	Kornilyev	Male	43	Native Hawaiian or Other Pacific Islander	Administrative Assistant	19101
39	ktebbutt12	ktebbutt12@smh.com.au	$2b$12$Gf3n.ya9m88FLQblfUcJn.eDeg0GsQOcVkpcDtWVS0B9vo.0eZFSi	Karlyn	Tebbutt	Female	51	Black or African American	Other	98101
40	bkulis13	bkulis13@yellowbook.com	$2b$12$D5fT.Vx6CNzBArQxZ3yrJeMzmpKROYKHpcyg8TmfIFkNPzyNgNzKK	Bud	Kulis	Male	31	Native Hawaiian or Other Pacific Islander	Electrician	33101
41	gmcclinton14	gmcclinton14@spotify.com	$2b$12$GoKF2DES7.nxwNin6oVgb.WckE0B8FShSW/rMjo4b15VwHB98lZhS	Grannie	McClinton	Male	55	American Indian or Alaska Native	Marketing Manager	85001
42	cosgodby15	cosgodby15@mozilla.com	$2b$12$jIDDXjj1Itb99eiMMccz/eIrWyfblwD5mHcWoHnMC5nRSWBmzhG1u	Cathy	Osgodby	Female	24	Black or African American	Pharmacist	99501
43	ccowwell16	ccowwell16@feedburner.com	$2b$12$GQSpBrLv6Q9VdriSjEm6/uegCqACMlT7PCRsoi1MIC6c338Ht1gVu	Celia	Cowwell	Bigender	39	American Indian or Alaska Native	Other	98101
44	lbogies17	lbogies17@europa.eu	$2b$12$oII.XlDH9010NgctFaxAD.Y5tTYZMSluu.Tyb3hkTqiFrvF3fSM9m	Leonerd	Bogies	Male	23	American Indian or Alaska Native	Graphic Designer	30301
45	eford18	eford18@globo.com	$2b$12$YDDRSOwtWR5QkFblyLvacePrTb3rzNZpVOh2ROwfFUGMo1H3Sli7C	Elnar	Ford	Male	60	Asian	Nurse Practitioner	27601
46	atrowel19	atrowel19@upenn.edu	$2b$12$FIdxCg9tAJM4oVT/tpq9aeRVsnAVFlhWH9yn3OOJK8H5tFpUSY85e	Allard	Trowel	Male	52	Black or African American	Registered Nurse	85001
47	jbeattie1a	jbeattie1a@goo.gl	$2b$12$CsHyitbV08JWuKRYG2z6rOSK4A1zn4lmAHt3E4TaJ8iF/nGvbpGnO	Jenine	Beattie	Female	50	American Indian or Alaska Native	Financial Analyst	99501
48	mbraam1b	mbraam1b@census.gov	$2b$12$drjWyOtPLdyznqIqPlfjMONHDNmaid2liPrguJ5560QmrQbjOYRDm	Maurizio	Braam	Genderfluid	35	Hispanic or Latino	Marketing Manager	89101
49	meynon1c	meynon1c@amazon.co.jp	$2b$12$n526ewUNCFgltkQmm.V8jOKPA7vgQpRUHIInOdlb0pMZBWy6O82gK	Maria	Eynon	Polygender	37	American Indian or Alaska Native	Teacher	63101
50	usearby1d	usearby1d@exblog.jp	$2b$12$F4e7iZ60WapM3Jt4d4u03.6rriidTzETQQyX/0YsxCmcm3WGH69UO	Urbain	Searby	Male	55	Native Hawaiian or Other Pacific Islander	Electrician	64101
51	cwimlet1e	cwimlet1e@cornell.edu	$2b$12$4AWAJImhQHBTTB6ZL7a3G.JyWKk4rC0cUjg2afCPbX5syBK3Ctju2	Cecilla	Wimlet	Female	52	White	Accountant	89101
52	ajeanequin1f	ajeanequin1f@rakuten.co.jp	$2b$12$3TGeLuk4H/AvwNuvpENyNeTzAUMsz7N7E4v3Pv0a1hs8zx/spQzti	Aldus	Jeanequin	Male	24	Hispanic or Latino	Pharmacist	02101
53	dtordoff1g	dtordoff1g@adobe.com	$2b$12$t1J.8p58gRjLevA/Gdr3Te/AvH8OBnxoSG0D7hgOjCtuBwt83WSaa	Daffi	Tordoff	Female	54	White	Doctor	21201
54	tmedcalf1h	tmedcalf1h@pcworld.com	$2b$12$5xKvivwJFDmurrYHeGRJxOnk63M07DP3a3IvP62.sOS4xoaMBXjDi	Talyah	Medcalf	Female	34	Native Hawaiian or Other Pacific Islander	Marketing Manager	99501
55	kruby1i	kruby1i@google.cn	$2b$12$PXqiufFsPt7hI3xj9LTv1./kMxmtb05rTGD8VuC3G0sunNKSiCW2a	Kessiah	Ruby	Female	29	White	Chef	70112
56	ajaniszewski1j	ajaniszewski1j@cocolog-nifty.com	$2b$12$nziPGFMNXsOSw4OUhH17zeBRgujgzs6gLzWSvZJP7E/1Cbmp5YoOW	Amby	Janiszewski	Male	33	White	Human Resources Manager	02101
57	cgoede1k	cgoede1k@indiatimes.com	$2b$12$R.LzBXxyZJ42sOVPHZSJGO5DFmr9hLI/BAEn5IINkxHlzyFXSE05G	Chelsie	Goede	Female	57	Black or African American	Mechanical Engineer	96801
58	edolton1l	edolton1l@ftc.gov	$2b$12$jE0WoMg3lOmzwWjAirrw9.i0EqtedA5Iej4vtAHlKQIs78BhmwDsm	Elisabeth	Dolton	Female	23	Native Hawaiian or Other Pacific Islander	Chef	80201
59	cpleace1m	cpleace1m@patch.com	$2b$12$IrafC9712UuCxTl/2xITIe97lDn7bKFPHC8fK4r2cqKsM5YPoAdU6	Colet	Pleace	Male	55	American Indian or Alaska Native	Nurse Practitioner	97201
60	lcusack1n	lcusack1n@auda.org.au	$2b$12$7At4mCkUJhCqFNrcDyKM/OixqONVnC.lvqac85QGQYPf7bER3.t5K	Linn	Cusack	Male	50	American Indian or Alaska Native	Software Developer	87101
61	pvoase1o	pvoase1o@bloomberg.com	$2b$12$CbYxthoKw4Uhd./x6Ppf2.yvxdONALWT9KzzkXZ0A9RJ/WXOHuqGW	Pacorro	Voase	Male	44	Asian	Other	85001
62	irettie1p	irettie1p@abc.net.au	$2b$12$Qo1V2CIlhGpn6rc75IK2T.Y6XstPQJtIrBYAPzA01QoX859JycFXi	Illa	Rettie	Genderfluid	26	Black or African American	Human Resources Manager	33101
63	xmann1q	xmann1q@bravesites.com	$2b$12$FEWHsqB0d9J42/cqoDyVhOTa30m54TmqHWRGC8zIPy05wUeRZi7pe	Xenos	Mann	Male	44	Hispanic or Latino	Nurse Practitioner	99501
64	jhobbema1r	jhobbema1r@wp.com	$2b$12$GjcJNfYaeoHsdFZsfostXeA9tuCPnShw0PDZzX.b1dj6kOORtgnnS	Jo-ann	Hobbema	Female	46	Black or African American	Electrician	30301
65	blawless1s	blawless1s@storify.com	$2b$12$Ww.yk9EG7dx2rfs6eLelKeeeNWzu5LZ0YfnU9EmDlD/ywhY44DEvG	Bobby	Lawless	Bigender	44	Other	Administrative Assistant	63101
66	jbrabban1t	jbrabban1t@nature.com	$2b$12$dgF.3H4V1P6VHcAbu2GfU.sDZKJVU9Ty1Z6UdvITZhXNgcclA3sZe	Julie	Brabban	Male	60	Other	Sales Representative	33101
67	cvanvelde1u	cvanvelde1u@cbslocal.com	$2b$12$ZbJBUyGfjycdWFpb2W/qqe/iII6uL42n/baIflvq31Aot5qHmlJGa	Catherine	Van Velde	Female	29	American Indian or Alaska Native	Administrative Assistant	94101
68	cwisedale1v	cwisedale1v@dion.ne.jp	$2b$12$uQU./QznRreBqp2HNFpZgelQZt9RrvR5vqo/.8J16CjWqOl1tS0km	Corissa	Wisedale	Female	48	Asian	Sales Representative	73101
69	zderobert1w	zderobert1w@loc.gov	$2b$12$bsH/CsJgDel4wJdAsK5iMendEuuIVrddbNjn0EbNPU1/4Qy8ODcV.	Zeke	Derobert	Male	61	Hispanic or Latino	Marketing Manager	84101
70	cturmell1x	cturmell1x@google.ca	$2b$12$LseefThGMNYAuSmDMoNZuuEcxNHPz/0FKqiEHnwn/DBUO3kgm5lcS	Chance	Turmell	Male	58	Other	Mechanical Engineer	92101
71	dabry1y	dabry1y@opera.com	$2b$12$pzCEWaBtg37Efbx4MkPnsuGwDgvZ3pcRgPldmUrYQD9X8c5D1XZMG	Durant	Abry	Male	22	Black or African American	Writer	28201
72	mhuban1z	mhuban1z@princeton.edu	$2b$12$72mH1qKqdemKxkfQ2sQND.VOAEm4uKE1Vk1CiZrL9oKt0e.En032.	Matthias	Huban	Male	43	Native Hawaiian or Other Pacific Islander	Other	99501
73	plittlefield20	plittlefield20@cdbaby.com	$2b$12$eMhoGtDsAxMSTHIyIdzvuOlRd5dxkceLFgK8YTigwr3hfaoIDk/.a	Paulette	Littlefield	Female	58	White	Web Designer	73101
74	gassiter21	gassiter21@loc.gov	$2b$12$P8WJ0OjSBOiXa/DPgNp0reKevBQaiDMD1/QO3as8ovKg8Af3NDfbm	Gabby	Assiter	Polygender	35	White	Other	77001
75	vavramow22	vavramow22@ucoz.com	$2b$12$Dl.koVrILKFl0hDF6lbE1etZTrcevwOZpxtgGO.fIBnpnjIi3jntm	Victoir	Avramow	Male	33	Other	Administrative Assistant	89101
76	mhoggetts23	mhoggetts23@ihg.com	$2b$12$9ixBxYtbj6NCTx5eNi2pOO0BMMJlSYYQRjNTBAQ8ZFPDL58qxnDTa	Merrill	Hoggetts	Male	27	White	Software Developer	33101
77	rberrecloth24	rberrecloth24@indiegogo.com	$2b$12$XfcMFsFac4yw8/N8gqKWdeKLdwAvGDYSZ8GxQPnbudfmeIIgmLmkS	Royal	Berrecloth	Male	51	Hispanic or Latino	Mechanical Engineer	80201
78	wkuhnhardt25	wkuhnhardt25@wikia.com	$2b$12$zPjxLyR8yaMheEfOADhV3.f3vLpFa4WQ4NHqToSBvM9zCQ0Fmy9Ki	Worthington	Kuhnhardt	Male	44	Asian	Marketing Manager	64101
79	abawden26	abawden26@arizona.edu	$2b$12$7zz7suygsAGg9lNcYthVy.zJ5p6ayU6AV8lhtxqm.XyELbrKx6Nm6	Abram	Bawden	Male	54	Black or African American	Other	55401
80	druprechter27	druprechter27@apache.org	$2b$12$Tr3FD7yl70wIe6DmrwtWLOiSwoznAE2gi9dV3iJT2VHzOPGfHeTAS	Dill	Ruprechter	Male	60	Black or African American	Software Developer	30301
81	qbroader28	qbroader28@yellowbook.com	$2b$12$0FSURaXOyXogxTbTsCG3TO.P2E7jJ4vi481XGz8u/dRbh6.N/lCFW	Quint	Broader	Male	29	Other	Electrician	27601
82	kfrawley29	kfrawley29@oakley.com	$2b$12$KglSRwS80/qyvOZnjTA8ouwVsBNx9OUmWBJ4jHHwu5CJ1G07rVy8W	Karyn	Frawley	Female	42	American Indian or Alaska Native	Chef	55401
83	cgerriet2a	cgerriet2a@tinyurl.com	$2b$12$Oz0AxzDnjZ2v7.jYZjjFBeRZ7gSUke8smEBpRsmU17WAVRN.ISd1K	Cherilyn	Gerriet	Female	59	American Indian or Alaska Native	Software Developer	89101
84	aleversuch2b	aleversuch2b@creativecommons.org	$2b$12$oPJtaU99AL1Z0PiFLCICM.MgLCI4OfgvNRnKUSyI0MZTkKEUkFPUa	Adrian	Leversuch	Male	42	Hispanic or Latino	Nurse Practitioner	27601
85	dbusfield2c	dbusfield2c@phoca.cz	$2b$12$x0dUDljtzjBYeh7IwWytJO2f428LGkqtbCb2BLgMzyQEZDFCafB9W	Dewey	Busfield	Male	21	White	Mechanical Engineer	43201
86	cmccarrell2d	cmccarrell2d@phpbb.com	$2b$12$Q.FWHvEU8D6JPc2V9kaHEuTH/fvt2LBy3GFmRRTvuo/MIrvh/wxSy	Cherye	McCarrell	Female	58	Hispanic or Latino	Human Resources Manager	73101
87	abowich2e	abowich2e@cnbc.com	$2b$12$PvEjizROKiMkj9.t1/Aaz.JTqSKCn.QBGGNrldYEQf8lutvK3ICWe	Audra	Bowich	Bigender	24	Asian	Writer	70112
88	akhoter2f	akhoter2f@ucla.edu	$2b$12$D7YzC.fE1CyIVro.ZEv2NOlqBTnCMf1JZsqkGri9/QGYjNksZ63LS	Althea	Khoter	Female	31	White	Mechanical Engineer	02101
89	tcudby2g	tcudby2g@mtv.com	$2b$12$kidIsTywk111RyZm2TqKW.1ZJcC0gCF7qW3qN6K3sd5Zpnxz4tyBK	Trevor	Cudby	Male	49	Asian	Teacher	84101
90	fjudd2h	fjudd2h@google.com.au	$2b$12$zpJcJV6eHCAZBIFyx1JKAeMTFuDfHKenCK02AYFy/mMt26vRnb0zK	Freda	Judd	Female	56	Hispanic or Latino	Doctor	77001
91	cscriven2i	cscriven2i@odnoklassniki.ru	$2b$12$PaP4FCdjjL/JQXA7g/7ENe.cdcs1RGAhn1HzcHA3jxg2DmyL8Ifhm	Camella	Scriven	Female	33	American Indian or Alaska Native	Software Developer	46201
92	esharpling2j	esharpling2j@livejournal.com	$2b$12$ebe.5Se.TB4W/oXGYl/FOuG8y01FZGp6D7BS0FNTIlL8oK4p4eHMy	Emeline	Sharpling	Female	45	Black or African American	Chef	33101
93	rleith2k	rleith2k@google.com.au	$2b$12$uCFrbhSXlMDcQpEbtnT/BOUZWUoonvD2ZS097HBc21D8aJs.cA4Aa	Rheba	Leith	Polygender	54	Asian	Web Designer	84101
94	lrowberry2l	lrowberry2l@networkadvertising.org	$2b$12$XLrNn0MACC22dF0RNKQdPOj0X0puOfwVKL2PNZXY4uomBt7fR.rmS	Lorrayne	Rowberry	Female	56	Other	Pharmacist	87101
95	koronan2m	koronan2m@odnoklassniki.ru	$2b$12$9EYH36nvGZB0M1zUi2Srhu9enOolMA2PLKNkU2N1Vq7H25EBZ7VZK	Keelby	O' Ronan	Male	28	Hispanic or Latino	Accountant	96801
96	szuppa2n	szuppa2n@cbc.ca	$2b$12$t9dB1c1aB8VkKXU9BQnq3.E5xhMug6A6y0O0Iov8mAUI6CnSaJwh.	Stafford	Zuppa	Male	57	Native Hawaiian or Other Pacific Islander	Other	77001
97	npaget2o	npaget2o@elegantthemes.com	$2b$12$SXWY8.NmhSYXaH..P5R3.Oodekt/lM6uXHgxH0aFDBYx.szI3mDrK	Nikita	Paget	Male	30	Hispanic or Latino	Writer	85001
98	rpantlin2p	rpantlin2p@behance.net	$2b$12$/cAU7FQWkhtIbcQ2fsntkOQ5t7UTQdIkzDEmR7J/LqFPzju7AWiIO	Rivi	Pantlin	Female	52	American Indian or Alaska Native	Teacher	92101
99	cbruckent2q	cbruckent2q@oakley.com	$2b$12$o3UaEXgQLRTby53U3jRW2O6juobMHFZ9MSDQTWDdexQRp0i.6o.VG	Chrystel	Bruckent	Female	55	American Indian or Alaska Native	Writer	70112
100	criordan2r	criordan2r@webeden.co.uk	$2b$12$nj2bKCKL95Cr47oXxf1ppuNhalgKs0Sa8oKkFj79/9ZGWbSOA4tSq	Cristobal	Riordan	Male	47	Black or African American	Software Developer	19101
101	cborrow2s	cborrow2s@weibo.com	$2b$12$aWBzuSg8GetMXY8gdiIMO.IW9NQoqM2YAu7SwEhdBnR95rAhcQbC6	Cello	Borrow	Male	56	Other	Software Developer	89101
102	njeannenet2t	njeannenet2t@ebay.com	$2b$12$5HIg0qNDigSKE01U56.0nOf9hFLlOdiq3hqUicKbG0DsHyWEgNcUm	Nico	Jeannenet	Male	54	Other	Writer	33101
103	amansour2u	amansour2u@marriott.com	$2b$12$c.vW0.jmIOih6CujFXNzf.RPr.pymUcDmaOL1eJJw0IOq9oe0Ed3i	Agnella	Mansour	Female	51	Hispanic or Latino	Doctor	55401
104	lsibylla2v	lsibylla2v@nyu.edu	$2b$12$YpfOhfnyJPGBl8joXaFMnuPeElfU5eSrv35fg/zcuvt34dAbf3y66	Linette	Sibylla	Female	25	American Indian or Alaska Native	Other	33101
105	erumsby2w	erumsby2w@purevolume.com	$2b$12$NhqO.QROvwrJ9S4FBsIrAeDfnHwh0D7TIre4rchbcgQ0RazXGStqO	Elisha	Rumsby	Female	55	White	Administrative Assistant	94101
106	ahinkins2x	ahinkins2x@abc.net.au	$2b$12$OzW7pu3ZZiB5QYmhwKwiLu1BVpN0FqXaAp04vteGC26Q.QV5BEdA2	Atlanta	Hinkins	Female	22	American Indian or Alaska Native	Pharmacist	55401
107	asnoxill2y	asnoxill2y@ask.com	$2b$12$vZeSIk0IFGMVpzpn1TXLpeIk.xszVGipaQhqEeYT0tYyU5GO86SWu	Alano	Snoxill	Male	56	Hispanic or Latino	Chef	96801
108	bgeorgeon2z	bgeorgeon2z@github.io	$2b$12$.JmtSISDRKqPNeJKGkHT2uyHbtUaAASBCczmeGZ.IqVdJ7leCnIbS	Barde	Georgeon	Male	56	Hispanic or Latino	Accountant	02101
109	lmallabund30	lmallabund30@behance.net	$2b$12$HAYLMWJE6TfMTmsymckHnOwQZGCKmjSp87V/f8Q3gbwrCq7QIJ4mK	Lynette	Mallabund	Female	21	American Indian or Alaska Native	Web Designer	19101
110	kdennistoun31	kdennistoun31@tripod.com	$2b$12$w9DDmvOmg6.ilyBkaje66.G17VfmjtrdcaSUo6Lm1XZGcxlWEfIBm	Kettie	Dennistoun	Female	30	Hispanic or Latino	Civil Engineer	89101
111	nsalzen32	nsalzen32@cocolog-nifty.com	$2b$12$MfK7HrL56DUDIhhQhZepvejE5EnBEwCvBQdwTZJtJVkY4qVztVuYq	Nata	Salzen	Female	31	Native Hawaiian or Other Pacific Islander	Web Designer	73101
112	asissland33	asissland33@usatoday.com	$2b$12$m0iWab8uLTT4cYQ/l.qIWOKmlI3IQP7QYo2DVshckrurG/7L3XIsm	Addy	Sissland	Male	53	Native Hawaiian or Other Pacific Islander	Chef	02101
113	mcotmore34	mcotmore34@samsung.com	$2b$12$LLzCj1.9fthnUS.W.9Rl0OykMo4KYHnCT5Pc206C1mh.2y6c1SRtm	Marje	Cotmore	Female	51	Hispanic or Latino	Sales Representative	48201
114	miacapucci35	miacapucci35@nps.gov	$2b$12$5XaoOtj9byMPTAjXyjFvL.tfqxztehdy9h6FILatKJv3zb95kgjx2	Martguerita	Iacapucci	Female	43	Other	Mechanical Engineer	92101
115	epottberry36	epottberry36@tripadvisor.com	$2b$12$GiH4pDEQIyLdw97iBxuEqOS8beb0X4bLaFC/bHJ1ZZERzEZmHlqjS	Eveleen	Pottberry	Female	56	Black or African American	Other	46201
116	aaleveque37	aaleveque37@wikispaces.com	$2b$12$UQewpoTPgfjzjlDVzJfYEucp29g/EF9TEHVnSRWR5jAEf55wVcJ.i	Allix	Aleveque	Female	46	Other	Chef	99501
117	mavesque38	mavesque38@arstechnica.com	$2b$12$xAdAGaxsQwyyDpje8nMNbeRiKsy6hhupfpnXEklIxUZ0xlJWgeEr2	Merla	Avesque	Female	57	White	Marketing Manager	33101
118	ksames39	ksames39@cmu.edu	$2b$12$lpv0P.SGspe4dsWxdhSgluDlfcQRP5zRCSDxA1Txk7Vsrmt94a11C	Kurtis	Sames	Male	61	Other	Civil Engineer	19101
119	rketley3a	rketley3a@seattletimes.com	$2b$12$yu.8mTzT5mX4DwHWtoLds.OMcFaapkjXpXJRYyAIOkoLtpqZUcE3q	Ricki	Ketley	Female	39	Black or African American	Financial Analyst	75201
120	eonians3b	eonians3b@is.gd	$2b$12$oN0gheBTEvNX0PK4ltS9aunK41LQjBPadn0Eie.CH69hHWEjnRSaG	Elwira	Onians	Genderqueer	32	Other	Pharmacist	21201
121	odeferrari3c	odeferrari3c@booking.com	$2b$12$6z71GA14oQcIvdfwJJSOl.1.DesISW3DZTmJ5NcVmGib3zJZFmo6i	Oralee	De Ferrari	Female	50	Other	Accountant	75201
122	mwapples3d	mwapples3d@arizona.edu	$2b$12$OgltBiaL.5mUYweS4MKiGuGDnsAI2cJnbLpaZWlgjyyOU2mSuRS0G	Marina	Wapples	Female	59	Asian	Administrative Assistant	96801
123	rjiricka3e	rjiricka3e@diigo.com	$2b$12$hA8/AzGOVB1BoggrhHickeYbhOON404Vg9.EHRZGyKiuwg.hCuuL2	Rickie	Jiricka	Male	44	Asian	Graphic Designer	48201
124	gblockley3f	gblockley3f@rediff.com	$2b$12$PYxoRjUH.T8TBowME7hLyu/t8AJ6EwfVbui1gvVs8a7RjQG5Nno1.	Gabbie	Blockley	Male	27	Native Hawaiian or Other Pacific Islander	Sales Representative	37201
125	thallgate3g	thallgate3g@umn.edu	$2b$12$0e4ipbunmzfqb46L6CeMQe.p0pDYfjmr2prCwPIp5Pmf26pSBEieG	Tiffy	Hallgate	Female	25	Black or African American	Software Developer	55401
126	tstandfield3h	tstandfield3h@reference.com	$2b$12$LPCNWObjEm8Up0uXri7lHeTeovqDCLeIUHzQipup6A1zZ7C/UP47S	Tess	Standfield	Female	53	Asian	Civil Engineer	64101
127	alabusch3i	alabusch3i@tinypic.com	$2b$12$hbhF/HVr7n9XRMfEjduP/eaxs64pQxi7tVIBcZLZLXNhx6uqAurIa	Alberto	Labusch	Male	54	Other	Mechanical Engineer	30301
128	vedgeley3j	vedgeley3j@sciencedaily.com	$2b$12$aGR.G1d04WU0hSBMOOCLKOqcTZv.SlApmKlNLePsWjWK2MSgNOa3K	Victor	Edgeley	Male	59	Other	Registered Nurse	75201
129	jwitchell3k	jwitchell3k@dell.com	$2b$12$nYTaXWtp1IeHcC/k07sKCucyxidDKUdB/OJHk2QSo25IH/DfWHUSO	Jarrad	Witchell	Male	43	Asian	Web Designer	64101
130	lboughtflower3l	lboughtflower3l@instagram.com	$2b$12$Howgqj1tSAV4LOrBdKVLfuZM5g0sZxxghi6s2BQn55Xqq7JXNexKm	Lisetta	Boughtflower	Female	61	Asian	Marketing Manager	99501
131	edisbrey3m	edisbrey3m@tumblr.com	$2b$12$vM37wU4ut150Zot8R820JemMBOlprF5zgejpLyx9yEgbQ5D7HV5ZK	Elnora	Disbrey	Female	39	American Indian or Alaska Native	Human Resources Manager	94101
132	sbrazenor3n	sbrazenor3n@vinaora.com	$2b$12$Qh/Polo9sg.BKZ.Z8JlxWuyAmlPm644GbY1JgZeLmlnV9W1JRDfJ6	Simmonds	Brazenor	Male	32	White	Nurse Practitioner	98101
133	rmawby3o	rmawby3o@princeton.edu	$2b$12$wPTAqazeuXyz9hNWfw.vFOOJ1LCkqJfiztXRmSkLCWXb98yPR7QjW	Roland	Mawby	Non-binary	43	White	Teacher	98101
134	etwohig3p	etwohig3p@elpais.com	$2b$12$v28i0jkISlK0qW8wmSiAKubJnuRy/vuspq1JuGfnfgG8I3/00IV6y	Edvard	Twohig	Male	37	Hispanic or Latino	Human Resources Manager	96801
135	collarenshaw3q	collarenshaw3q@tamu.edu	$2b$12$Y6E.uRxxfqTD9Dkg70BGBOnjMILEA7G.1Z5S9kTPStivMW6OCuoS6	Cassondra	Ollarenshaw	Female	43	Native Hawaiian or Other Pacific Islander	Writer	43201
136	sgearty3r	sgearty3r@opera.com	$2b$12$WHQtHsL0Pw7R9eXebaShAeMjZuCR.YA07qVIihwf0DY1tRP/eZZ9e	Serene	Gearty	Female	60	Native Hawaiian or Other Pacific Islander	Writer	48201
137	jfone3s	jfone3s@timesonline.co.uk	$2b$12$KrIzBR9sdFmEvKhV6tkq7O6DwcJsFprgozYtgN7vnDADsV69shoeu	Jethro	Fone	Male	38	Hispanic or Latino	Civil Engineer	55401
138	moscandall3t	moscandall3t@weather.com	$2b$12$7/3GBVpPFR1kR75lhMX12eCFVNN/iYvA3GjP8TPn92ZTm4FQn/7xO	Mischa	O'Scandall	Male	42	Hispanic or Latino	Graphic Designer	28201
139	ntreanor3u	ntreanor3u@nps.gov	$2b$12$bPBm99G31yIYHliofzlPuecE5MR/vTd2bv1HVHI8Sz.u8XQjPh.8W	Norina	Treanor	Female	30	White	Electrician	19101
140	jgoldthorpe3v	jgoldthorpe3v@youtu.be	$2b$12$GgqdZpBlGfEcJlfAAGmINeVfzRNfqSjvXpiFSsCTD9l.oC84Vovc.	Jasun	Goldthorpe	Male	37	White	Software Developer	97201
141	mskyppe3w	mskyppe3w@wp.com	$2b$12$wLgkhvIhMC.PlI7dMUegFeL8DnVRiDJr96rsc6lvqhzppIzaHSbie	Massimo	Skyppe	Male	41	Asian	Doctor	73101
142	bwearden3x	bwearden3x@latimes.com	$2b$12$Oj5NIv9K1ymsUOOzVKT9oO4SmcIBmGTmuOXdBMl6QvcWz0UNki/r2	Brigitte	Wearden	Female	29	Native Hawaiian or Other Pacific Islander	Teacher	77001
143	ashapcote3y	ashapcote3y@gizmodo.com	$2b$12$EL8BVSxJSG6DVvngkpFSbuZEUIjvEgCl8NbWhV/r9NUhLhF.xPsXm	Amitie	Shapcote	Female	48	Hispanic or Latino	Administrative Assistant	77001
144	lvannacci3z	lvannacci3z@sohu.com	$2b$12$UUqXASbPGnUU1xko2blRKOfZfG7xzF.iuYMVCQQtIXZPe.ZfI2p/C	Lissi	Vannacci	Female	28	Other	Marketing Manager	30301
145	brudman40	brudman40@ow.ly	$2b$12$R1dnx0VvSGOOLYMGKb9wzOdQ3lAezNNomnuojfSwUmJjWJ.djKUMq	Bobbe	Rudman	Female	56	White	Electrician	19101
146	rpilmer41	rpilmer41@engadget.com	$2b$12$qm79T5m1QhZ4Dz14XS/ROOkgZlmynESiIzQ4msrljjgc7UBYMiRqK	Rafaelita	Pilmer	Female	60	White	Nurse Practitioner	64101
147	nlabroue42	nlabroue42@cdbaby.com	$2b$12$4f/lSwoG0sytHqd8egXWHepnX7Y1h5CcUX0wmlO9mCtXqnZNkFhcq	Nicolina	Labroue	Female	26	American Indian or Alaska Native	Electrician	19101
148	ppelchat43	ppelchat43@hao123.com	$2b$12$3eDbOtU5fVMiPM098wu41uc/amUQBHPwd02QS76BxA4upLOD1.Z2K	Parsifal	Pelchat	Bigender	61	Other	Marketing Manager	89101
149	nlowder44	nlowder44@youku.com	$2b$12$Eup.YTjB7tNL2/zc31xHu.VaVXIDMQXuusYc.xE2YDmxSw3XIY9ii	Nicholle	Lowder	Female	23	American Indian or Alaska Native	Nurse Practitioner	48201
150	edoubleday45	edoubleday45@dot.gov	$2b$12$QFXMRmhuLDxaa6R7eMs4wOZ6214A4DWatkKCsgPf5uZ907n63Sd3a	Evania	Doubleday	Female	39	Asian	Marketing Manager	77001
151	swhelpton46	swhelpton46@bbb.org	$2b$12$9vqigVE4lTpCoYw9XhvjUema4Am/UuxwLgtNA7aclxrKl.WFRNrHW	Solomon	Whelpton	Male	32	White	Doctor	48201
152	mrowbury47	mrowbury47@wikispaces.com	$2b$12$r5zbsbo5PEcMA14Q858dP..oiUmMGSVAPdS32l5/BvLfd09USbDym	Margit	Rowbury	Female	26	Native Hawaiian or Other Pacific Islander	Software Developer	37201
153	dcarwardine48	dcarwardine48@howstuffworks.com	$2b$12$rshCzSKTCczjybcx65ja3uHmbRbX15w.hrQQTVLkW56zdShi71rYK	Derk	Carwardine	Male	44	Black or African American	Electrician	85001
154	bbangle49	bbangle49@twitpic.com	$2b$12$Hdde4ji/xUKmWORktJ6k0u/zs5pL7fKtJPy.kacrfgMBVzx/ZNKpC	Bron	Bangle	Male	58	American Indian or Alaska Native	Accountant	96801
155	bdraysay4a	bdraysay4a@theglobeandmail.com	$2b$12$rZ8X3ko8ikqjM4Nw3FVcueRYQngdxRPSHrmgZQV6MB.pGrezQrUp.	Bern	Draysay	Male	52	Black or African American	Human Resources Manager	85001
156	jthackwray4b	jthackwray4b@netlog.com	$2b$12$TNMEBXpoYgJeeXv3hfk1T.osGUBbfEXAhYrBAAYl/7CzuG/ybIly2	Joshua	Thackwray	Male	51	Native Hawaiian or Other Pacific Islander	Administrative Assistant	63101
157	jsimpkins4c	jsimpkins4c@wunderground.com	$2b$12$e4eWi...pYFUPRofsREcX.XXw8l2XAN.LFgXPUbuCn9da2k4vhjHa	Jeff	Simpkins	Male	61	Other	Other	21201
158	aravenhill4d	aravenhill4d@netlog.com	$2b$12$OtPrjTjk/ZqOMjUTZHKsRu78ZlH7Gw2N1K5uosyWKdVd1a9h4d0o2	Ada	Ravenhill	Female	56	Native Hawaiian or Other Pacific Islander	Sales Representative	27601
159	eesler4e	eesler4e@cdbaby.com	$2b$12$Mbk5PFdM/hPSorOk98zcTutyhjW/9ReC2ZYQlBMQTNAaYCKXBSqu6	Emiline	Esler	Female	42	Other	Writer	28201
160	iscreas4f	iscreas4f@fda.gov	$2b$12$kSGdX6FniIRBVUajXY4orujoeQcr3MwACsg37DGDIBYa/gnhZnDGe	Inna	Screas	Female	34	American Indian or Alaska Native	Writer	19101
161	ppischel4g	ppischel4g@spotify.com	$2b$12$GT7olJZgs6yDWUjcz70MUOSVdNqDPOaj47XtsgXHwhjpGZu3Dt9/i	Pierrette	Pischel	Female	38	White	Web Designer	80201
162	morodane4h	morodane4h@sina.com.cn	$2b$12$UsMXx/mwwsNOezmolpLFbuWkC4XCm3P9el2g33OCfMA4oaZz78rHy	Modestia	O'Rodane	Female	42	Hispanic or Latino	Graphic Designer	60601
163	gthirst4i	gthirst4i@bluehost.com	$2b$12$8lOkvFvF6X6BSN7JS/hjaOguEH.GBqWfoMB/Ds7SW4Ojcu9Q2YvvK	Gardie	Thirst	Non-binary	28	Hispanic or Latino	Electrician	70112
164	dyoung4j	dyoung4j@odnoklassniki.ru	$2b$12$0uLAExnQUxv/UqzuWqtkrexUSGu.OiL0oqjmsSYq9oJMsmYDYJRLS	Danny	Young	Male	38	Hispanic or Latino	Teacher	27601
165	lcaldroni4k	lcaldroni4k@ucsd.edu	$2b$12$fLNMfOxkY8rn4BmQH7lcQubajio.ls27.a2P0x6igc9alfiPUpUBi	Lorens	Caldroni	Male	49	American Indian or Alaska Native	Administrative Assistant	21201
166	hecles4l	hecles4l@phoca.cz	$2b$12$U8f4rOzGPFwvxFsNcm4SzO3KEly9nLOGrxwTpP51/c46/bY5qFaSO	Had	Ecles	Genderqueer	49	American Indian or Alaska Native	Graphic Designer	46201
167	aadamides4m	aadamides4m@si.edu	$2b$12$zAFp1hGqPU7ZmVRLVWtJvOQkwttTPW5FhUjAxMBiHzJKuwchBGfki	Ardath	Adamides	Female	50	Asian	Sales Representative	92101
168	scady4n	scady4n@walmart.com	$2b$12$sydxeTWluGS1witSSfJwU.2G3CAGFh3olBlqEZ/U8aEwPs62GdOPS	Sandra	Cady	Female	23	Hispanic or Latino	Financial Analyst	46201
169	ethewlis4o	ethewlis4o@nyu.edu	$2b$12$Y3USig6Ku3triP.PubfVQ.Y472Nt7/NsACI8jif4uRTJvjRyAa8eG	Evin	Thewlis	Polygender	33	Other	Mechanical Engineer	33101
170	lgreenley4p	lgreenley4p@blinklist.com	$2b$12$8jiD5XV//Cs2RrYzmBcRn.GnHHxpRXeBI.DLcbeYIiHJUGD/3scqu	Lani	Greenley	Female	33	Asian	Pharmacist	92101
171	atellwright4q	atellwright4q@mail.ru	$2b$12$GgidIDuiSCzmk8K5fVFxd.ftyQVLfytHjFQf5jIK8NMzdx2fqEwB6	Annabelle	Tellwright	Female	43	Asian	Human Resources Manager	33101
172	shanretty4r	shanretty4r@shareasale.com	$2b$12$4dboh.phP8n8SCZuMge.XeCw.nAQJEVJK6iDQqC17GcdGs5wK2M.O	Shem	Hanretty	Male	30	Hispanic or Latino	Mechanical Engineer	94101
173	wfidgin4s	wfidgin4s@virginia.edu	$2b$12$sOME2T7LB3y9XCvAxFaAseLeUy2y/g3RvmYLPBTB5Zqr9rkwhYxoC	Waring	Fidgin	Male	55	Other	Nurse Practitioner	37201
174	hchidler4t	hchidler4t@hibu.com	$2b$12$Egldww4eOXHHvZaPOay6G.8plwDz9ZND.VUDC6amSAix5WGWJ3l6y	Hayes	Chidler	Male	34	White	Doctor	85001
175	koquin4u	koquin4u@blogger.com	$2b$12$NSjN6bOoa8Lgot89fpvG4eoQdLkxB53vu1eFdkegmyY30iwA9tISK	Klaus	O'Quin	Male	40	White	Writer	33101
176	jschoffel4v	jschoffel4v@free.fr	$2b$12$T1LhJLBAqK10VjoImpnWMuMjf1k2xd/.ldCdlUiRphiwLAwRlLYKm	Jason	Schoffel	Male	38	Other	Electrician	63101
177	brosenkrantz4w	brosenkrantz4w@engadget.com	$2b$12$YOmD1pINiNe/XRJlHlGly./lY8coaSUvtWOg5u8EbG1mbCeBCe1AC	Bevvy	Rosenkrantz	Non-binary	44	White	Software Developer	92101
178	nosselton4x	nosselton4x@abc.net.au	$2b$12$4AaH8GVHQgq9pZxHTOlOAuvqagMibPeyDjw2yd7YVJVYNl85n1bv.	Nonna	Osselton	Female	31	White	Sales Representative	02101
179	jgreenrodd4y	jgreenrodd4y@timesonline.co.uk	$2b$12$rAPj7LetDuRZ/FpC1GHdWON6Zfm6Rx5g.YgYVPvJgkRvzoNDaUhSC	Jo ann	Greenrodd	Female	34	Hispanic or Latino	Other	21201
180	dmanie4z	dmanie4z@illinois.edu	$2b$12$e3uQztoeq7b3VTziq3zFguvuUzgq7EhQEEkfqqFAlnKJvD3ehCJHG	Donnell	Manie	Male	21	Asian	Graphic Designer	87101
181	jboss50	jboss50@oaic.gov.au	$2b$12$VKmrgk/hlsouIczD8Q4VwuAki6CIVn0hSFnWqiWhPdYSyDb2zUgSi	Jeffie	Boss	Male	34	Asian	Chef	28201
182	ephippard51	ephippard51@discovery.com	$2b$12$/s4VfzDCvga6zwdcggJHZuAhykxzBXQAspWdNREwd.0i8MJykibL6	Eziechiele	Phippard	Male	29	Hispanic or Latino	Mechanical Engineer	27601
183	ccooley52	ccooley52@howstuffworks.com	$2b$12$/p1MPHyJzofEcI.DTZJdP.VK8gASvFODmBn/ZBgBGkhOSOXxFFbe.	Collette	Cooley	Female	35	American Indian or Alaska Native	Pharmacist	28201
184	ringry53	ringry53@newsvine.com	$2b$12$ylFX70QoMROGddXaTF2Q1.3lYuRSjj9z2Z6mX9jGPW10mNq897xOK	Roderick	Ingry	Male	37	Other	Human Resources Manager	60601
185	asmith54	asmith54@taobao.com	$2b$12$lzcWAEVyTw.Xc4KtHmHmCeyI1tXKY1E2aUC5TapoRTXz73AbJIhPa	Adrien	Smith	Male	46	Hispanic or Latino	Electrician	46201
186	lchild55	lchild55@zimbio.com	$2b$12$2HgEshkjekPuMrCyCV7yTuHbaFlwomkFEWpQ8RiSmZpLPvnpc1EBi	Lynnet	Child	Genderfluid	23	Asian	Pharmacist	96801
187	wshankle56	wshankle56@mail.ru	$2b$12$rFQBBuEQNsaad7b1/57cAekoFnK18hQCeroP78baxc3ZjqXFSKwai	Wesley	Shankle	Male	27	Hispanic or Latino	Data Analyst	37201
188	mstearns57	mstearns57@ed.gov	$2b$12$g7.GMtRUh3IrjZgQnXoEG.2MkCvEV..joZDsQ2p92A2vvpiilav7W	Melodie	Stearns	Polygender	30	Asian	Other	60601
189	cdaldan58	cdaldan58@newyorker.com	$2b$12$44yn3QFLd6lvqFuXOHlQ2uByIGqV1Jk9EuyTUabuzbzR36rPcCBT.	Cherida	Daldan	Female	54	Native Hawaiian or Other Pacific Islander	Sales Representative	77001
190	lgalbreath59	lgalbreath59@japanpost.jp	$2b$12$Y/aKeolMI6W4O6axkGczVOut3vkbHThHSo51efPKt1gPWoW8nk8kq	Lorinda	Galbreath	Female	53	Native Hawaiian or Other Pacific Islander	Sales Representative	60601
191	abuttfield5a	abuttfield5a@senate.gov	$2b$12$o6wo6VY9RYMyfuaU7pCE3Oo6G9aP54Yvdh4XEq1S6/zXjnU004yMC	Anna-diana	Buttfield	Female	39	Other	Mechanical Engineer	97201
192	dofielly5b	dofielly5b@blog.com	$2b$12$Op1/yRYDmyJKzg8JJQJKruPMfp/CcGJ2QhxoyDWnP2Vd/.fPOjVJa	Dareen	O'Fielly	Female	53	Black or African American	Web Designer	19101
193	alarrie5c	alarrie5c@chicagotribune.com	$2b$12$3ny9XZ./067Jdt0/yCm0deAIcXoxqJedBPMs.9dvDC0f9xXR0g.X6	Aileen	Larrie	Female	36	Hispanic or Latino	Mechanical Engineer	48201
194	spymar5d	spymar5d@dion.ne.jp	$2b$12$zRieVavFkvgWIE2ORrfT0OK7izW6jDdar1z1H.wQJ/Vo7ToTe9wj2	Salome	Pymar	Female	54	Native Hawaiian or Other Pacific Islander	Data Analyst	37201
195	mrolston5e	mrolston5e@hp.com	$2b$12$q3By65Y1MBJD0VqXZGQnke43bPq6qBB4HfIccbvrtIjNrKhMr3vdm	Marje	Rolston	Female	35	Black or African American	Software Developer	75201
196	cianno5f	cianno5f@webmd.com	$2b$12$U02PJm71X.nULi8NXKsEuOCyiQTGn0KNuSa1VI3lzmzt29tJ4pq5S	Clementina	Ianno	Female	58	White	Web Designer	96801
197	mwebby5g	mwebby5g@usatoday.com	$2b$12$8KO/h8PbQOgYhc7EiPsTFeLq0hA4/XV38eit.VJJ.snQsO4ldmjH2	Marty	Webby	Male	36	Native Hawaiian or Other Pacific Islander	Human Resources Manager	19101
198	wshitliffe5h	wshitliffe5h@nps.gov	$2b$12$X7mlv8Y68ShZBtGDvzTH9..wmSDF0pYQ9mhBMpCaJ5qCLOtzQ86TW	Weber	Shitliffe	Male	25	American Indian or Alaska Native	Civil Engineer	02101
199	croisen5i	croisen5i@washington.edu	$2b$12$8KxCfr4x7rqqmJsFlcda4eTY93.7E95sxcobpsJBDPy89PcdGTFcW	Celestine	Roisen	Female	40	White	Chef	80201
200	hsurgener5j	hsurgener5j@netvibes.com	$2b$12$SRcQsb.QvuUVrFp.PYkVre1ruAC43uj81Ooo5dnrj8Pcbf1NIeNsW	Hollie	Surgener	Female	27	Black or African American	Software Developer	85001
201	testuser	testuser@test.com	$2b$12$V2nH/BrDP385laitzFDm9uPTlJoDG6svfFJVg6lVck50T6OOkfmLG	Test	User	Female	27	Asian	Software Developer	85001
\.


--
-- Name: category_tags_category_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: judyjiang
--

SELECT pg_catalog.setval('public.category_tags_category_tag_id_seq', 6, true);


--
-- Name: chat_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: judyjiang
--

SELECT pg_catalog.setval('public.chat_room_id_seq', 2, true);


--
-- Name: chat_room_member_id_seq; Type: SEQUENCE SET; Schema: public; Owner: judyjiang
--

SELECT pg_catalog.setval('public.chat_room_member_id_seq', 28, true);


--
-- Name: chat_room_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: judyjiang
--

SELECT pg_catalog.setval('public.chat_room_message_id_seq', 15, true);


--
-- Name: group_tags_group_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: judyjiang
--

SELECT pg_catalog.setval('public.group_tags_group_tag_id_seq', 245, true);


--
-- Name: groups_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: judyjiang
--

SELECT pg_catalog.setval('public.groups_group_id_seq', 245, true);


--
-- Name: user_groups_user_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: judyjiang
--

SELECT pg_catalog.setval('public.user_groups_user_group_id_seq', 1597, true);


--
-- Name: user_tags_user_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: judyjiang
--

SELECT pg_catalog.setval('public.user_tags_user_tag_id_seq', 1206, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: judyjiang
--

SELECT pg_catalog.setval('public.users_user_id_seq', 201, true);


--
-- Name: category_tags category_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.category_tags
    ADD CONSTRAINT category_tags_pkey PRIMARY KEY (category_tag_id);


--
-- Name: chat_room_member chat_room_member_pkey; Type: CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.chat_room_member
    ADD CONSTRAINT chat_room_member_pkey PRIMARY KEY (id);


--
-- Name: chat_room_message chat_room_message_pkey; Type: CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.chat_room_message
    ADD CONSTRAINT chat_room_message_pkey PRIMARY KEY (id);


--
-- Name: chat_room chat_room_pkey; Type: CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.chat_room
    ADD CONSTRAINT chat_room_pkey PRIMARY KEY (id);


--
-- Name: group_tags group_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.group_tags
    ADD CONSTRAINT group_tags_pkey PRIMARY KEY (group_tag_id);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (group_id);


--
-- Name: user_groups user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT user_groups_pkey PRIMARY KEY (user_group_id);


--
-- Name: user_tags user_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.user_tags
    ADD CONSTRAINT user_tags_pkey PRIMARY KEY (user_tag_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: group_tags group_tags_category_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.group_tags
    ADD CONSTRAINT group_tags_category_tag_id_fkey FOREIGN KEY (category_tag_id) REFERENCES public.category_tags(category_tag_id);


--
-- Name: group_tags group_tags_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.group_tags
    ADD CONSTRAINT group_tags_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(group_id);


--
-- Name: user_groups user_groups_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT user_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(group_id);


--
-- Name: user_groups user_groups_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT user_groups_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: user_tags user_tags_category_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.user_tags
    ADD CONSTRAINT user_tags_category_tag_id_fkey FOREIGN KEY (category_tag_id) REFERENCES public.category_tags(category_tag_id);


--
-- Name: user_tags user_tags_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: judyjiang
--

ALTER TABLE ONLY public.user_tags
    ADD CONSTRAINT user_tags_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

