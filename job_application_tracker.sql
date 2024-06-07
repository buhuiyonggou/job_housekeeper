--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Homebrew)
-- Dumped by pg_dump version 14.11 (Homebrew)

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

--
-- Name: Category; Type: TYPE; Schema: public; Owner: tomomori
--

CREATE TYPE public."Category" AS ENUM (
    'Software',
    'Hardware',
    'Accounting',
    'Accounting_Service',
    'Finance',
    'Risk_Management',
    'Marketing',
    'Sales',
    'Human_Resources',
    'Customer_Service',
    'Legal',
    'Education',
    'Engineering',
    'Healthcare',
    'Art_and_Design',
    'Data_Science',
    'Product_Management',
    'Operations',
    'Supply_Chain',
    'Manufacturing',
    'Quality_Assurance',
    'Research_and_Development',
    'IT_Support',
    'Public_Relations',
    'Real_Estate',
    'Construction',
    'Consulting',
    'Environmental',
    'Agriculture',
    'Hospitality',
    'Tourism',
    'Transportation',
    'Logistics',
    'Media_and_Communications',
    'Non_Profit',
    'Government',
    'Security',
    'Other'
);


ALTER TYPE public."Category" OWNER TO tomomori;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: tomomori
--

CREATE TYPE public."Status" AS ENUM (
    'Applied',
    'Interview',
    'Offer',
    'Rejected',
    'Updating'
);


ALTER TYPE public."Status" OWNER TO tomomori;

--
-- Name: Term; Type: TYPE; Schema: public; Owner: tomomori
--

CREATE TYPE public."Term" AS ENUM (
    'Fall',
    'Winter',
    'Spring',
    'Summer'
);


ALTER TYPE public."Term" OWNER TO tomomori;

--
-- Name: Type; Type: TYPE; Schema: public; Owner: tomomori
--

CREATE TYPE public."Type" AS ENUM (
    'Full_Time',
    'Part_Time',
    'Internship',
    'Contract',
    'Temporary',
    'Freelance'
);


ALTER TYPE public."Type" OWNER TO tomomori;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: tomomori
--

CREATE TABLE public."Account" (
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Account" OWNER TO tomomori;

--
-- Name: Application; Type: TABLE; Schema: public; Owner: tomomori
--

CREATE TABLE public."Application" (
    company text NOT NULL,
    category public."Category" NOT NULL,
    job_title text NOT NULL,
    type public."Type" NOT NULL,
    term public."Term" NOT NULL,
    year integer NOT NULL,
    location text NOT NULL,
    application_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    job_info text,
    position_code text,
    track_link text,
    "assignedToUserId" character varying(255),
    application_id integer NOT NULL,
    status public."Status" DEFAULT 'Applied'::public."Status" NOT NULL,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public."Application" OWNER TO tomomori;

--
-- Name: Application_application_id_seq; Type: SEQUENCE; Schema: public; Owner: tomomori
--

CREATE SEQUENCE public."Application_application_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Application_application_id_seq" OWNER TO tomomori;

--
-- Name: Application_application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tomomori
--

ALTER SEQUENCE public."Application_application_id_seq" OWNED BY public."Application".application_id;


--
-- Name: Job_Collection; Type: TABLE; Schema: public; Owner: tomomori
--

CREATE TABLE public."Job_Collection" (
    image text,
    company text NOT NULL,
    title text NOT NULL,
    description text,
    location text NOT NULL,
    "employmentType" text,
    "salaryRange" text,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    id text NOT NULL,
    "datePosted" text
);


ALTER TABLE public."Job_Collection" OWNER TO tomomori;

--
-- Name: Job_Providers; Type: TABLE; Schema: public; Owner: tomomori
--

CREATE TABLE public."Job_Providers" (
    url text NOT NULL,
    "jobId" text NOT NULL,
    id integer NOT NULL,
    "jobProvider" text NOT NULL
);


ALTER TABLE public."Job_Providers" OWNER TO tomomori;

--
-- Name: Job_Providers_id_seq; Type: SEQUENCE; Schema: public; Owner: tomomori
--

CREATE SEQUENCE public."Job_Providers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Job_Providers_id_seq" OWNER TO tomomori;

--
-- Name: Job_Providers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tomomori
--

ALTER SEQUENCE public."Job_Providers_id_seq" OWNED BY public."Job_Providers".id;


--
-- Name: PasswordResetToken; Type: TABLE; Schema: public; Owner: tomomori
--

CREATE TABLE public."PasswordResetToken" (
    id text NOT NULL,
    "userId" text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PasswordResetToken" OWNER TO tomomori;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: tomomori
--

CREATE TABLE public."Session" (
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO tomomori;

--
-- Name: User; Type: TABLE; Schema: public; Owner: tomomori
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    name text DEFAULT 'Anonymous'::text,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    password text,
    description text,
    gender text,
    linkedin text,
    personal_site text
);


ALTER TABLE public."User" OWNER TO tomomori;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: tomomori
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO tomomori;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: tomomori
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO tomomori;

--
-- Name: Application application_id; Type: DEFAULT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."Application" ALTER COLUMN application_id SET DEFAULT nextval('public."Application_application_id_seq"'::regclass);


--
-- Name: Job_Providers id; Type: DEFAULT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."Job_Providers" ALTER COLUMN id SET DEFAULT nextval('public."Job_Providers_id_seq"'::regclass);


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: tomomori
--

COPY public."Account" ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, "createdAt", "updatedAt") FROM stdin;
clwpxqhdz0000euxyux4gizzt	oauth	google	108054809795768171055	\N	ya29.a0AXooCgvJZcnP6UTR148CZiZT2ot6WoBmOxWqqbc4xRjn0IfpcMjGQTKQdMH_L2ycdmZXo9ABsbxW_mdHNaYcra1xmgjzQS6K_gdeJFcH_OUYY1LkuhWoLxqZbkKgbSn6_xoPppcwe980QaGCH20XWe6ggx3sADCDak1UaCgYKAdYSARESFQHGX2MistCbgKpfoeQG9IWj4msu6A0171	1716876397	Bearer	https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid	eyJhbGciOiJSUzI1NiIsImtpZCI6IjY3MTk2NzgzNTFhNWZhZWRjMmU3MDI3NGJiZWE2MmRhMmE4YzRhMTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4OTkyMjUwNjk0NjAtc2tnYTRzZDlmbG1yZnR2dnRmYXViMG9iMWhpMjBtbG4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4OTkyMjUwNjk0NjAtc2tnYTRzZDlmbG1yZnR2dnRmYXViMG9iMWhpMjBtbG4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDgwNTQ4MDk3OTU3NjgxNzEwNTUiLCJlbWFpbCI6InlhbmdsaTQ5NDRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJvX1lnRXkteTBucjVnODlSLTBfVXlRIiwibmFtZSI6IllhbmcgTGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSUVMYWg2Mi0zLW13T2lZM3pKQVd3bXJMUzEyVWFkOEdsZGtXYmdIazkySVhWWmhRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IllhbmciLCJmYW1pbHlfbmFtZSI6IkxpIiwiaWF0IjoxNzE2ODcyNzk4LCJleHAiOjE3MTY4NzYzOTh9.b5BpmbfQYmspUq_JYDAq6-DKk_CUIjHFHjK3h6e6w4kqZ1EFsDWZ_mLWivW8OvJdrBd71azGeuKUCHh_pFt8A7rJO3e7fAdb5etUUjRNcH--NqDjX3lxirfYa_AMTWe6Irr5oHZlh8YfsETdz7gTM-l9iS_VJQCjKoZYkCFnH2Ha1X1BMwrhiZWKP3yBH5dbUUaDa1JoccuI1S1qamUbeGMe-TjjgMjX2CX5RuYNV9CNzprgsqzbB_OuTLl3DUe9XYyFdVBYeStrUC47xnUQWwKuiAxJ5JZjh0OrBBBPDGQzjtVNIP4XHkLkqYPHaQ3lg-8qMLYbARzrnbcLiDdS3A	\N	2024-05-28 05:06:38.108	2024-05-28 05:06:38.108
clx3vtd3d0000rfnfeitq3sbx	oauth	google	102425316831823065573	\N	ya29.a0AXooCguwxWxPpYe-JMLjwqm_hIzL5pFGnfzSPaEQXSPkGOVJp7Jbm1BOOXtFXjsxYqpq8E6kRH3nUp9YKrE3vKhD7AGI76q173bUMMA_f2L3bTaaC4kysMzfag8-sHpyofjl-rxVvG8Ge8p03VQpZrvn83eD6KXXBFLdaCgYKAQYSARMSFQHGX2MimQU9O8xYnA8oZtNFQ7gO4Q0171	1717719698	Bearer	openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile	eyJhbGciOiJSUzI1NiIsImtpZCI6IjY3NGRiYmE4ZmFlZTY5YWNhZTFiYzFiZTE5MDQ1MzY3OGY0NzI4MDMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4OTkyMjUwNjk0NjAtc2tnYTRzZDlmbG1yZnR2dnRmYXViMG9iMWhpMjBtbG4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4OTkyMjUwNjk0NjAtc2tnYTRzZDlmbG1yZnR2dnRmYXViMG9iMWhpMjBtbG4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDI0MjUzMTY4MzE4MjMwNjU1NzMiLCJlbWFpbCI6Im5hZ2lzYTQ5NDRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJYaXZ1Y1FvSURDWXFTSWhBVl9mZ3R3IiwibmFtZSI6Im5hZ2lzYSBrdSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJb1RsV1daWWJOVUU4eWVZM3l5Y1AzSDQ3TTFfdWVmOFJ2MlhMRHR4OVJtMjJaZzRJPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Im5hZ2lzYSIsImZhbWlseV9uYW1lIjoia3UiLCJpYXQiOjE3MTc3MTYwOTksImV4cCI6MTcxNzcxOTY5OX0.ofsZGFIUPfojB2wfhGjPD3iO56OzI12K3C-6Tu-xOWXZZu2Ab3w9va7vGcZuDV5fqffUMfnw0cqnseH8OpBtr-9ofYrpsimqk_dcw7HmFtfG5U3WIKqRcc5IHeNypsRwJ3jXKWn61FrZa_3zk2Uh7jBl-DCoC6YiVOXoFeb7dAyvBX6Po2nhKYqy0Jkr8Y48xEGhznFRZhrs-i-9w9HjRj9lWQBefvsQ0o2W9tvgZ1rjJBJCuqTnKzpoA14kCImlbfTci66f5ahdWcznYwku3yv_tvEXhwOxw2AKlgorb2yKpFz1AAoDnQ-WEIaQKeNz0KTJ0cgXGeRqtmfJmmrTeA	\N	2024-06-06 23:21:39.736	2024-06-06 23:21:39.736
\.


--
-- Data for Name: Application; Type: TABLE DATA; Schema: public; Owner: tomomori
--

COPY public."Application" (company, category, job_title, type, term, year, location, application_date, job_info, position_code, track_link, "assignedToUserId", application_id, status, "updatedAt") FROM stdin;
Green Energy Corp	Environmental	Energy Analyst	Full_Time	Fall	2024	Austin, TX	2024-05-25 00:25:44.1	Analyze energy consumption and optimize resources.	EA002	https://greenenergy.com/jobs/energy-analyst	clwvrtd0b0000q89sscpppwu3	2	Offer	\N
Health Solutions	Healthcare	Medical Researcher	Part_Time	Fall	2024	Boston, MA	2024-05-25 00:27:07.633	Conduct research and clinical trials.	MR003	https://healthsolutions.com/jobs/medical-researcher	clwvrtd0b0000q89sscpppwu3	3	Updating	\N
Finance Wizards	Finance	Financial Advisor	Full_Time	Fall	2024	New York, NY	2024-05-25 00:27:25.358	Provide financial advice and planning services.	FA004	https://financewizards.com/jobs/financial-advisor	clwvrtd0b0000q89sscpppwu3	4	Rejected	\N
Urban Plan	Real_Estate	Real Estate Agent	Full_Time	Fall	2024	New York, NY	2024-05-25 00:28:48.197	Help clients buy, sell, and rent properties.	REA014	https://urbanplan.com/jobs/real-estate-agent	clwr7ztgl0000xzx1pxqgt0z2	14	Rejected	2024-06-05 02:32:44.918
Retail Giants	Sales	Store Manager	Full_Time	Fall	2024	Los Angeles, CA	2024-05-25 00:27:35.477	Manage store operations and staff.	SM005	https://retailgiants.com/jobs/store-manager	clwvrtd0b0000q89sscpppwu3	5	Rejected	\N
EduTech	Education	Instructional Designer	Contract	Fall	2024	Chicago, IL	2024-05-25 00:27:49.982	Design and develop educational content.	ID006	https://edutech.com/jobs/instructional-designer	clwvrtd0b0000q89sscpppwu3	6	Interview	\N
Tokyo Tel	Customer_Service	Customer Service Representative	Part_Time	Summer	2023	Tokyo	2024-06-02 06:38:40.741				clwr7ztgl0000xzx1pxqgt0z2	21	Interview	2024-06-05 04:32:58.532
AutoDrive	Engineering	Mechanical Engineer	Full_Time	Fall	2024	Detroit, MI	2024-05-25 00:27:56.853	Design and test automotive systems.	ME007	https://autodrive.com/jobs/mechanical-engineer	clwvrtd0b0000q89sscpppwu3	7	Interview	\N
Tech Innovators	Hardware	Software Engineer	Part_Time	Winter	2024	San Francisco, CA	2024-05-25 00:21:45.798	Develop and maintain software applications.	SE001	https://techinnovators.com/jobs/software-engineer	clwvrtd0b0000q89sscpppwu3	1	Interview	2024-06-05 06:20:11.337
Foodies Inc	Hospitality	Chef	Full_Time	Fall	2024	San Francisco, CA	2024-05-25 00:28:03.359	Prepare and cook meals.	C008	https://foodiesinc.com/jobs/chef	clwvrtd0b0000q89sscpppwu3	8	Applied	\N
Teck	IT_Support	IT support Coop	Full_Time	Spring	2025	Vancouver	2024-06-04 19:31:31.011				clwr7ztgl0000xzx1pxqgt0z2	22	Applied	\N
Travel Experts	Tourism	Travel Consultant	Part_Time	Fall	2024	Miami, FL	2024-05-25 00:28:12.211	Plan and book travel arrangements.	TC009	https://travelexperts.com/jobs/travel-consultant	clwvrtd0b0000q89sscpppwu3	9	Applied	\N
MediaWorks	Media_and_Communications	Graphic Designer	Full_Time	Fall	2024	Los Angeles, CA	2024-05-25 00:28:20.15	Create visual content for various media.	GD010	https://mediaworks.com/jobs/graphic-designer	clwvrtd0b0000q89sscpppwu3	10	Applied	\N
EcoBuilders	Construction	Project Manager	Contract	Fall	2024	Denver, CO	2024-05-25 00:28:26.585	Oversee construction projects from start to finish.	PM011	https://ecobuilders.com/jobs/project-manager	clwvrtd0b0000q89sscpppwu3	11	Applied	\N
CloudNet	IT_Support	Network Engineer	Full_Time	Fall	2024	Seattle, WA	2024-05-25 00:28:35.424	Design and manage network infrastructure.	NE012	https://cloudnet.com/jobs/network-engineer	clwvrtd0b0000q89sscpppwu3	12	Applied	\N
ArtHouse	Art_and_Design	Art Director	Contract	Fall	2024	Los Angeles, CA	2024-05-25 00:28:54.598	Lead and manage creative projects.	AD015	https://arthouse.com/jobs/art-director	clwr7ztgl0000xzx1pxqgt0z2	15	Applied	\N
BioTech Solutions	Healthcare	Lab Technician	Full_Time	Fall	2024	San Diego, CA	2024-05-25 00:28:41.419	Assist in laboratory experiments and research.	LT013	https://biotechsolutions.com/jobs/lab-technician	clwr7ztgl0000xzx1pxqgt0z2	13	Offer	2024-06-05 02:32:20.996
\.


--
-- Data for Name: Job_Collection; Type: TABLE DATA; Schema: public; Owner: tomomori
--

COPY public."Job_Collection" (image, company, title, description, location, "employmentType", "salaryRange", "userId", "createdAt", "updatedAt", id, "datePosted") FROM stdin;
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuH3Mhz9DABDDZo4jZvc4euQs5QxxK774HqvmB&s=0	Think Big Solutions	Senior Software Developer	Senior Developer Opportunity in Digital Technology Practice (12 month contract)\n\nAbout AroundHI:\n\nWe are multinational IT and Management Consulting firm. We help our client manage and deliver tech project in various industries.\n\nAbout the Role:\n\nOur client, a leading midsize accounting and advisory firm with offices in Vancouver and Toronto, is currently seeking a Senior Programmer to join their Digital Technology practice. This firm offers value-added audit, tax, and advisory solutions supporting local businesses across every major industry sector, from large, publicly traded companies to emerging and owner-managed businesses. Leveraging specialty services from partners across Canada and globally through an international affiliation, they foster meaningful careers and a commitment to building great relationships, conversations, and futures.\n\nResponsibilities:\n• Gather and document user requirements; routinely assess application interactions, analyze data, and propose enhancement... strategies for existing applications, automation routines (BOTS), and scripts to boost user experience.\n• Evaluate project requirements and specifications, offering viable solutions.\n• Create program specifications and basic prototypes.\n• Write, debug, and test code for various automation routines, application features, and components.\n• Develop automation tools (process BOTS) using MS Power Apps.\n• Regularly review programs and applications, making necessary adjustments for optimal performance.\n• Integrate and deploy applications across various platforms and environments.\n• Document and maintain code and application architecture.\n• Collaborate with other developers, designers, testers, and stakeholders.\n• Co-lead and collaborate with a team of IT specialists when required.\n• Update and enhance existing applications to improve performance, security, and usability.\n• Research and learn new technologies and best practices to stay current with industry trends.\n\nRequirements:\n• Bachelor’s degree in Computer Science, Software Engineering, or a related field.\n• Proven experience as a Programmer or Software Developer with a solid grasp of software development principles.\n• Familiarity with MS Power Automate and MS Power Apps is a plus.\n• Strong analytical and problem-solving skills, capable of troubleshooting complex issues and proposing effective solutions.\n• Excellent communication and interpersonal skills for effective collaboration in a team setting.\n• A proactive attitude towards learning and self-improvement, with a passion for technology and innovation.\n\nWhat’s in it for you?\n• Career advancement opportunities.\n• Competitive compensation package including extended health care, dental, and group life insurance benefits.\n• Generous vacation (3+ weeks/year).\n• Access to Continuing Professional Development courses and numerous informal training opportunities. Reimbursement for approved professional development fees and membership dues.\n• An open-door culture promoting interaction with all staff levels, including partners.\n• A fully-stocked kitchen with breakfast foods, healthy snacks, and treats during tax season, plus coffee, tea, and drinks throughout the year.\n• Overtime meal and parking reimbursements.\n• A smart casual dress code (client/day specific).\n• Client referral, employee referral, and vehicle purchase incentives.\n• Numerous entertaining social events throughout the year\n\nJoin AroundHI and become part of a dynamic team that values technology, innovation, and professional growth.\n\nJob Type: Full-time\n\nPay: $30.00-$50.00 per hour\n\nSchedule:\n• Monday to Friday\n\nApplication question(s):\n• Do you have a Bachelor’s degree in Computer Science, Software Engineering, or a related field?\n• This is hybrid role, with 3 days in office required. Office is located in downtown. Are you okay with that?\n• Do you have experience in developing automation tools (process BOTS) using MS Power Apps? If yes, how many years?\n\nExperience:\n• MS Power Automate: 4 years (preferred)\n• MS Power Apps: 4 years (preferred)\n• Team management: 4 years (preferred)\n\nWork Location: In person	Vancouver, BC, Canada	Full-time	CA$30–CA$50 an hour	clwr7ztgl0000xzx1pxqgt0z2	2024-06-04 18:29:15.358	2024-06-04 18:29:15.358	UyxlLG4saSxvLHIsICxTLG8sZixULGgsaSxuLGssICxCLGksZywgLDIsVixhLG4sYyxvLHUsdixlLHI=	19 days ago
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxitMBCzZzkbCiTDpJ1NdPKMbEbjbDhMcs5g2X&s=0	FLEETCOR	Senior Software Developer	Your role\n\nWhat You'll Be Doing\n\nWhat We Need\n\nCorpay is currently looking to hire a Senior Software Developer within our PayByPhone line of business based in Vancouver, Canada. In this role, you will develop major components that power our consumer apps and global platform enabling over 17 million users to conveniently pay for parking. You will report directly to the Software Development Manager and work with the Software Development team within own domain and cross functionally, and with Product colleagues.\n\nThe salary range for this role is $115k CAD - $145k CAD per year.\n\nHow We Work\n\nAs a Senior Software Developer, you will be expected to work in a remote/hybrid environment reporting to out Vancouver office location 1-2 times a month. Corpay will set you up for success by providing:\n• Company-issued equipment\n\nRole Responsibilities\n\nThe responsibilities of the role will include:\n• Leaving your fingerprints on the design of products, architect our infrastructure, and improve... technical documentation\n• You are a go-to technical expert for other people in the organization, articulating technical concepts to non-technical stakeholders\n• Working with your team to design and develop automated test suites and establish test plans\n• Working with product management and client services to scope out work and define acceptance criteria\n• Participating in code reviews to share expertise with the team, ensure code quality, and verify PCI compliance\n• Participating in mob- and pair-programming sessions to distribute knowledge across the team and collaborate on finding solutions to complex problems\n• Using and improving our automated CI/CD pipeline\n• Provisioning and maintaining cloud infrastructure for your team’s products\n• Monitor the health and success of your team’s products through application and system metrics\n• Owning the success of the features and systems you and your team develop. This includes monitoring, investigating issues, and supporting the service during outages\n• Mentoring fellow team members, helping to grow new technical leaders\n• Helping improve development standards, tooling, and processes\n• Participating in technical decision-making within the team, taking a lead role where appropriate\n• Providing on-call, critical response on a rotational basis to support relevant PayByPhone development teams.\n• You must maintain a personal data plan to fulfill your responsibilities for on-call support.\n\nEducation &amp; Experience\n• Bachelor’s degree in Computer Science or Software Engineering\n• 8+ years’ experience designing, developing, and maintaining scalable production software that stands up to real-world users and production conditions\n\nQualifications &amp; Skills\n• Full Stack Back End role:\n• Expert-level ability to code in C#\n• Experience with cloud platforms like AWS/Azure\n• Other skills\n• An excellent understanding of software engineering techniques\n• Worked in an agile development environment using processes like Kanban or\n• Scrum\n• Experience with relational and non-relational databases such as Oracle, MySQL, MongoDB, or DynamoDB\n• Experience with service-oriented or microservices architecture using synchronous REST) and asynchronous (event-driven) integration\n• Experience with refactoring\n• Experience with production monitoring and observability\n• Experience with React\n• Experience with Docker, Terraform\n• Familiarity with Domain Driven Design concepts\n• Experience with Front End Development and integration with back-end services\n• Experience with API Gateway technologies\n• You’re excited about building robust and extensible 24/7 back-end services for a global market\n\nAbout Corpay\n\nCorpay is a global technology organisation that is leading the future of commercial payments with a culture of innovation that drives us to constantly create new and better ways to pay. Our specialized payment solutions help businesses control, simplify, and secure payment for fuel, general payables, toll and lodging expenses. Millions of people in over 80 countries around the world use our solutions for their payments.\n\nAll offers of employment made by Corpay (and its subsidiary companies) are subject to the successful completion of satisfactory pre-employment vetting by an independent supplier (Experian). This is in accordance with Corpay's Resourcing Policy and include employment referencing, identity, adverse financial, criminal and sanctions list checks. We do this to meet our legal and regulatory requirements.\n\nCorpay is dedicated to encouraging a supportive and inclusive culture among our employees. It is within our best interest to promote diversity and eliminate discrimination in the workplace. We seek to ensure that all employees and job applicants are given equal opportunities.\n\nNotice to Agency and Search Firm Representatives: Corpay will not accept unsolicited CV's from agencies and/or search firms for this job posting. Resumes submitted to any Corpay employee by a third party agency and/or search firm without a valid written &amp; signed search agreement, will become the sole property of Corpay. No fee will be paid if a candidate is hired for this position as a result of an unsolicited agency or search firm referral. Thank you	Vancouver, BC, Canada	Full-time		clwr7ztgl0000xzx1pxqgt0z2	2024-06-04 18:29:16.634	2024-06-04 18:29:16.634	UyxlLG4saSxvLHIsICxTLG8sZixGLEwsRSxFLFQsQyxPLFIsOCxWLGEsbixjLG8sdSx2LGUsciwsLFk=	13 days ago
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnWxNA5w472wqgBWJbT6wqQd_uHMmklYpnLovn&s=0	Mastercard	Software Engineer II (SDET) QA - Java	Our Purpose\n\nWe work to connect and power an inclusive, digital economy that benefits everyone, everywhere by making transactions safe, simple, smart and accessible. Using secure data and networks, partnerships and passion, our innovations and solutions help individuals, financial institutions, governments and businesses realize their greatest potential. Our decency quotient, or DQ, drives our culture and everything we do inside and outside of our company. We cultivate a culture of inclusion for all employees that respects their individual strengths, views, and experiences. We believe that our differences enable us to be a better team – one that makes better decisions, drives innovation and delivers better business results.\n\nTitle and Summary\n\nSoftware Engineer II (SDET) QA - Java\n\nWho is Mastercard?\nMastercard is a global technology company in the payments industry. Our mission is to connect and power an inclusive, digital economy that benefits everyone, everywhere by making... transactions safe, simple, smart, and accessible. Using secure data and networks, partnerships and passion, our innovations and solutions help individuals, financial institutions, governments, and businesses realize their greatest potential.\n\nOur decency quotient, or DQ, drives our culture and everything we do inside and outside of our company. With connections across more than 210 countries and territories, we are building a sustainable world that unlocks priceless possibilities for all.\n\nOverview\n• The Decision Management program enables intelligent decision-based products through streaming analytics with the ability to govern these decisions and manage their outcomes with business agility.\n• This program leverages business rules &amp; AI engines, a streaming big data cluster, an in-memory data grids, APIs, &amp; UIs to deliver real time decisions at global scale\n\nWe are looking for a Software Engineer II - Test to join our DMP team for the Decision Operations product in Vancouver office.\n\n• Are you a technical programmer with experience working on high performance applications?\n• Do you want to be part of a team which helps prevent fraud on every Mastercard transaction in this world?\n\nRole\n• Design test cases and write both manual and automated tests\n• Perform performance testing in JMeter\n• Own software delivery tasks (development, test, deployment, support, documentation, configuration) at an application/software component level\n• Full stack tester that can test both front end and backend (REST API) applications\n• Participate in all the scrum ceremonies using SAFe Agile methodology.\n• Adopt best development practices, new languages, architecture patterns to write well designed, maintainable, testable, scalable, and secure code.\n• Write code to do unit testing, mutation testing, integration testing, functional and regression testing.\n• Provide support by troubleshooting production incidents and implementing corrective and preventive actions\n• Demonstrate active learning and sharing of software practices via Guild/Engineering community initiatives\n• Perform code reviews, refactoring and writing technical documentation of APIs and services being delivered\n\nAll About You\n• Has ability to code automated tests using Java, Spring and other frameworks\n• Full stack tester with experience writing automated tests for front and back end applications\n• Experience with testing frameworks (e.g. Rest Assured, Selenium with web driver etc)\n• Understands and builds test code at unit level, service level, and integration level to ensure code and functional coverage (e.g. Junit. Mockito etc)\n• Understands the use of basic design patterns (e.g., factory, adaptor, singleton, composite, observer, strategy, inversion of control)\n• Familiar with different application patterns to implement different types of business processes (e.g., APIs, event-driven-services, batch-services, web-applications, big data)\n• Bachelor's degree in Computer Science, Software Engineering, or a related field\n• Excellent at problem-solving with creative troubleshooting skills\n• Strong organizational skills; able to manage multiple tasks within the constraints and timelines determined by business needs.\n• Passionate about continuous improvement and delivering results\n\nDesirable Skills\n• Experience with CI/CD, monitoring tools like Splunk or Dynatrace, performance testing using JMeter, cloud development, Docker, Kubernetes etc.\n• Experience working with Redis and Kafka.\n• Familiar with secure coding standards (e.g., OWASP, CWE, SEI CERT)\n• Applied tools (e.g., Sonar, Zally, Checkmarx, Black Duck ) and techniques to scan and measure code quality and anti-patterns as part of development activity\n\nPay Ranges\nVancouver, Canada: $83,000 - $133,000 CAD\n\nMastercard is an inclusive equal opportunity employer that considers applicants without regard to gender, gender identity, sexual orientation, race, ethnicity, disabled or veteran status, or any other characteristic protected by law. In the US or Canada, if you require accommodations or assistance to complete the online application process or during the recruitment process, please contact reasonable_accommodation@mastercard.com and identify the type of accommodation or assistance you are requesting. Do not include any medical or health information in this email. The Reasonable Accommodations team will respond to your email promptly.\n\nCorporate Security Responsibility\n\nAll activities involving access to Mastercard assets, information, and networks comes with an inherent risk to the organization and, therefore, it is expected that every person working for, or on behalf of, Mastercard is responsible for information security and must:\n• Abide by Mastercard’s security policies and practices;\n• Ensure the confidentiality and integrity of the information being accessed;\n• Report any suspected information security violation or breach, and\n• Complete all periodic mandatory security trainings in accordance with Mastercard’s guidelines	Vancouver, BC, Canada	Full-time		clwr7ztgl0000xzx1pxqgt0z2	2024-06-04 18:29:19.686	2024-06-04 18:29:19.686	UyxvLGYsdCx3LGEscixlLCAsRSxNLGEscyx0LGUscixjLGEscixkLDgsVixhLG4sYyxvLHUsdixlLHI=	13 days ago
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw21IKzTvyqmAhMDx9zr2CPmGFT1PCsvme3E4g&s=0	Electronic Arts	Software Engineer II	Software Engineer - EADP - Data\n\nThe EA Digital Platform (EADP) group is the core powering the global EA ecosystem. We provide the foundation for all of EA's incredible games and player experiences with high-level platforms like Cloud, Commerce, Data and AI, Gameplay Services, Identity and Social. By providing reusable capabilities that game teams can easily integrate into their work, we let them focus on making some of the best games in the world and creating meaningful relationships with our players. We're behind the curtain, making it all work together. Come power the future of play with us.\n\nThe Challenge Ahead:\n\nWe are looking for developers who want to work on a large-scale distributed data system that empowers EA Games to personalize player experience and engagement.\n\nYou will be reporting to the Technical Director of EADP Data&amp;AI - DEX Backend Team.\n\nResponsibilities\n• You will help build a unified platform across EA, extract and process massive data from numerous game... studios, and use the insight to serve massive online requests\n• You will develop large-scale online platform to personalize player experience and provide reporting and feedbacks\n• You will write reliable and efficient programs to process and consume massive (petabyte) datasets with large clusters of machines\n• You will help develop reporting systems that inform on important metrics, detect anomalies, and forecast future results\n• You will work with data architects, data analysts, and BI developers to understand requirements, develop ETL processes, validate results, and deliver to production\n\nQualifications\n• Master's degree or foreign degree equivalent in Computer Science, Electrical Engineering, or related field.\n• 3+ years of experience with software development, writing clean reusable code, test-driven development, and continuous integration.\n• Fluency with an Object-oriented language such as Java, C++ or Scala.\n• Fast prototyping skills, familiarity with scripting languages such as bash, awk, python.\n• Experience with distributed systems to serve massive concurrent requests.\n• Experience working with online &amp; offline databases, including columnar, relational or document databases.\n• Experience working with data streaming and processing systems.\nCeci ne s'applique pas au Quebec.\n\nBC COMPENSATION AND BENEFITS\n\nThe base salary ranges listed below are for the defined geographic market pay zones in these locations. If you reside outside of these locations, a recruiter will advise on the base salary range and benefits for your specific location.\n\nEA has listed the base salary ranges it in good faith expects to pay applicants for this role in the locations listed, as of the time of this posting. Salary offered will be determined based on numerous relevant business and candidate factors including, for example, education, qualifications, certifications, experience, skills, geographic location, and business or organizational needs.\n\nBASE SALARY RANGES\n\nBritish Columbia (depending on location e.g. Vancouver vs. Victoria):\n$96,400 - $133,900 CAN Annually\n\nBase salary is just one part of the overall compensation at EA. We also offer a package of benefits including vacation (3 weeks per year to start), 10 days per year of sick time, paid top-up to EI/QPIP benefits up to 100% of base salary when you welcome a new child (12 weeks for maternity, and 4 weeks for parental/adoption leave), extended health/dental/vision coverage, life insurance, disability insurance, retirement plan to regular full-time employees. Certain roles may also be eligible for bonus and equity	Anywhere	Full-time		clwvrtd0b0000q89sscpppwu3	2024-06-04 18:36:05.931	2024-06-04 18:36:05.931	UyxvLGYsdCx3LGEscixlLCAsRSxFLGwsZSxjLHQscixvLG4saSxjLDMsQSxuLHksdyxoLGUscixlLFM=	1 day ago
https://fonts.gstatic.com/s/i/googlematerialicons/auto_stories/v8/gm_grey-24dp/1x/gm_auto_stories_gm_grey_24dp.png	Toonie Holding Inc.	Software Developer, Software Engineer, Senior Developer	Education:\n\nCollege, CEGEP or other non-university certificate or diploma from a program of 3 months to less than 1 year\n\nExperience:\n\n2 years to less than 3 years or equivalent experience Tasks Write, modify, integrate and test software code Maintain existing computer programs by making modifications as required Communicate technical problems, processes and solutions Prepare reports, manuals and other documentation on the status, operation and maintenance of software Assist in the development of logical and physical specifications Research and evaluate a variety of software products JavaScript Object Notation (JSON) Computer and technology knowledge Agile Blockchain Development and operations (Dev Ops) Jira Machine Learning Spring Framework Windows Presentation Foundation (WPF) Xcode Intranet Internet Servers Java JavaScript File management software JSP CSS Security software Multimedia software Object-Oriented programming languages PHP SQL .NET\n\nAjax JQuery Software development Data... analysis software API TCP/IP Amazon Web Services (AWS) MySQL React Native React.js Ruby Microservices Vue.js MS SQL Server Area of specialization Development of computer applications\n\nWork Term:\n\nPermanent\n\nWork Language:\n\nEnglish\n\nHours:\n\n40 hours per week	West Vancouver, BC, Canada	Full-time		clwvrtd0b0000q89sscpppwu3	2024-06-04 18:36:06.49	2024-06-04 18:36:06.49	UyxvLGYsdCx3LGEscixlLCAsRCxULG8sbyxuLGksZSwgLEgsbyxsLDEsVyxlLHMsdCwgLFYsYSxuLGM=	19 hours ago
https://fonts.gstatic.com/s/i/googlematerialicons/auto_stories/v8/gm_grey-24dp/1x/gm_auto_stories_gm_grey_24dp.png	FI.SPAN	Senior Software Engineer (Backend)	Our Business\n\nFISPAN is an Enterprise SaaS FinTech start-up that allows for banks to deploy embedded financial products and services to create a seamless banking connection for their corporate clients. Our product aims to provide instant scale and reach for banks who want to remove friction and add value by enabling their commercial banking clients to access banking services through their preferred operational software. Founded in 2016 by respected and renowned entrepreneur Lisa Shields, FISPAN is on a mission to create the best product in the FinTech industry, and fundamentally change the way that companies bank. Being the market leader in ERP-banking, we work with the world's Tier 1 banks with assets exceeding up to $3T, including J.P. Morgan Chase.\nWith our rapid growth and global expansion, we are looking for dynamic and passionate individuals to join our team and inclusive culture. FISPAN recognizes that the differences in each of us is what makes FISPAN a different kind of... business. Being a Vancouver based start-up, our modern and scenic office is located in downtown's historic Marine Building. The interview process for this position will be entirely remote, and we are open to remote work options.\n\nPosition\n\nWe are looking for a senior developer with experience using Docker, Kubernetes, AWS and looking to take on new challenges. The candidate should be ready to lead the team on the technical front and work closely with the other engineering teams to promote a collaborative environment and bring ideas forward. Their mission would be to use technology to deliver high quality client integrations, and iteratively reduce time per integration by building reusable components.\n\nThey should drive technological initiatives and mentor the team with regards to improvements and new technologies. The ideal candidate will have an excellent understanding of Java/Spring Boot within a microservices environment. You will report directly to the team lead and assist in identifying and reporting KPIs.\n\nThe team and company are growing, you will need to identify ways to improve efficiency and work with the engineering leads across all teams to identify weaknesses and improvements. You will be part of the core implementations engineering team working closely with product to build out solutions for numerous payment provider partners and build upon integrations with internal engineering teams.\n\nThe successful candidate will be a strong technical lead with excellent communication skills able to work collaboratively with many teams and help encourage and mentor other members of the team, including documentation, identifying enhancements/tools and being part of a regular on-call rota to support our other teams.\n\nKey Responsibilities\n• Design and implement enhancements to our banking platform in languages like Java(17 and above) and Kotlin\n• Design and implement integrations with clients via various methodologies (sftp/API/configuration)\n• Knowledge of Restful APIs using backend frameworks like Spring-boot(Java / Kotlin)\n• Owning team's deliverables and directing the team towards higher quality standards, assisting in technology choices.\n• Participate in technical discussions and decision-making with the goal of high-quality deliverables, faster implementations for the clients.\n• Good understanding of modern cloud infra/deployments like AWS, docker, kubernetes.\n• Previous experience with Fintechs and accounting / ERP systems is a great asset.\n• Participate in the team's on-call support. We follow the principle "You build it, you maintain it".\n• Passion for technology and readiness to adapt with the changing technology landscape.\n\nIf you feel you'd be a great fit, let us know why and include some examples of your craft (GitHub links are the best). Here is some info on our tech stack.\n\nWhy Work With Us?\n• Experienced team\n\nOur CEO's previous venture, Hyperwallet, was purchased by Paypal and ranks as one of the largest Canadian acquisitions! All of our Co-Founders are seasoned professionals within their field. Join our team to build your network and engage in mentorship opportunities.\n• Start-Up Environment\n\nFISPAN's start-up nature implies autonomy and leadership over projects. Our employees hold a higher level of responsibility and are presented with various hands-on opportunities from the get-go. We want our team to reach their full potential and career aspirations.\n• Rich Culture\n\nWe understand that personal growth happens on multiple levels, which is why we encourage a work-life balance to have family time, explore new ideas and develop hobbies. At FISPAN, you can also expect various (virtual) company-wide events and clubs to drive engagement.\n• Perks\n\nOur prime downtown Vancouver office is close to a Skytrain, prestige shopping, and coastal views. FISPAN employees have access to our building fitness center and amenities, fully stocked cupboards, weekly team lunches, and daily coffee runs. We also set our employees up for success by providing the most modern MacBook and Apple equipment.\n• Compensation &amp; Vacation\n\nFISPAN offers industry-researched and competitive pay, annual compensation reviews, options, incentive plans, and health &amp; wellness benefits. Also, enjoy four weeks accruing vacation per annum. We believe in rewarding our driven and hardworking team.\n\nCompensation and Benefits Package\n\nFISPAN believes in an atmosphere and culture when innovation can flourish, collaboration and teamwork are valued and transparency is at the core of it all. We want our employees to see how the ideas they help generate today have an impact on how we do business tomorrow.With that, the hiring salary range for this position is $119,000-$145,000annually; the base pay offered is based on comparable market data from companies of similar employee size, revenue and location.As part of our total rewards offering, permanent employees in this position may be eligible for our competitive semi-annual bonus program, subject to program eligibility requirements.\n\nAt FISPAN, we reward employees for achieving their objectives, going beyond the requirements of their job, demonstrating leadership, fostering innovation and advancing the organization as a whole. We value talented people of all backgrounds and characteristics that share our vision of being the number one platform for the business banking ecosystem.\n\nOther components of our towards rewards offerings include support of career development, wellbeing, and personal growth.\n• Extended health and dental benefits\n• Paid time off\n• Savings and retirement plan matching\n• Parenthood top-up\n• Mentorship programs, and leadership series (to name a few)\n\nNote: The incentive programs, benefits, and perks have certain eligibility requirements and may vary, only be partially or not at all available based on criteria such as location, employment status, etc. We'll be happy to clarify eligibility for interviewing candidates.\n\nDiversity, Equity &amp; Inclusion\n\nAs FISPAN continues to grow, we are committed to celebrating diversity, endorsing equity, and encouraging inclusion. This starts in the recruitment process. All job postings are first evaluated in a gender decoding platform to ensure fair candidate pools. Human Resources and hiring managers also engage in blind-hiring and resume review practices to ensure we are being objective and mitigating any potential biases.\n\nFISPAN'S underrepresented groups stand at over 50% with an equal gender balance in our upper manager team, as well. Notably, this position is within the Product department which has our most underrepresented groups representation at over 50% of the department. We aim to make FISPAN the best place to start, explore, and grow a career for everyone	Anywhere	Full-time		clwvrtd0b0000q89sscpppwu3	2024-06-04 18:36:08.113	2024-06-04 18:36:08.113	UyxlLG4saSxvLHIsICxTLG8sZixGLEksLixTLFAsQSxOLDQsQSxuLHksdyxoLGUscixlLE8sdSxyLCA=	28 days ago
https://fonts.gstatic.com/s/i/googlematerialicons/auto_stories/v8/gm_grey-24dp/1x/gm_auto_stories_gm_grey_24dp.png	ethos	Senior .NET Software Developer	ethos is a leading loyalty platform for brands who want to deliver exciting benefits to their customers and keep them coming back. One place for customers to get regularly rewarded for their purchases, enter a member-only contest, watch an exclusive behind-the-scenes video, access to a limited product, and so much more.\n\nThis role reports to the Director of Engineering and will form part of our small but excellent engineering team. This is your chance to get in on the ground floor of a growing team and put your own personal stamp on the technology stack and development process.\n\nWho you are\n• A back-end or full-stack developer that doesn’t mind getting involved in all areas of the technology stack.\n• You have strong experience working with C# .NET Core.\n• You have experience working with cloud platforms, ideally Microsoft Azure.\n• You have experience working with relational databases.\n• You are comfortable architecting technical solutions from the ground up.\n• You have experience... working with React or NextJS.\n\nWhat you will do\n• Code! We are a lean team and we believe that developers are happiest when they are developing and solving problems.\n• Take the initiative. You are getting in early so you will have every opportunity to implement your ideas, and are not afraid to move fast and iterate quickly.\n• Learn! We are heavily immersed in emerging technology so there will be a huge opportunity for you to learn and expand your skillset.\n• Collaborate, architect, and build quality solutions.\n\nWhat we offer\n• Competitive salary, benefits and stock options.\n• Flexible working environment. Work from home or collaborate in our downtown office.\n• An opportunity to be a part of a fantastic team and another Vancouver success story.\n\nCandidates can apply confidentially by following the apply button or emailing a resume to: people@heyethos.com	Vancouver, BC, Canada	Full-time		clwvrtd0b0000q89sscpppwu3	2024-06-04 18:36:08.917	2024-06-04 18:36:08.917	UyxlLG4saSxvLHIsICwuLE4sRSxlLHQsaCxvLHMsNixWLGEsbixjLG8sdSx2LGUsciwsLGUsdCxoLG8=	6 days ago
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYXUUtF2QdRAbBQOonzv0hpJLtJ2j8AJfcd53V&s=0	Imperva	Senior Software Engineer	The Opportunity\n\nIf you are curious about how companies protect their customers’ personal data, we want to hear from you! We are looking for an experienced full stack engineer to join our expanding Data Privacy team in Vancouver, BC. We’re increasing support for newer databases and non-traditional data sources, leveraging machine learning to detect personal data, building intuitive application integrations and reporting capabilities, and improving our clients’ visibility and control over their customers’ data.\n\nPosition Summary\n\nAs a Full Stack Software Engineer, you will design and develop software that is easily maintainable, highly reliable, and demonstrates knowledge of engineering best practices. You will regularly collaborate with your scrum team, along with other teams and stakeholders, throughout the development process. You will engage in project sizing and design, feature development and peer reviews, and support application debugging and auxiliary testing as needed. And... readily give and receive help, upskilling yourself and the team while delivering against business requirements.\n\nVancouver, Canada (Hybrid)\n\nKey Areas of Responsibility\n• Design and build scalable and reliable micro-services based applications\n• Build enterprise grade apps to provide enterprise API security\n• Take new feature ideas from drawing board to finished product solution. This includes requirements gathering, design, development and delivery of the solution\n• Deliver solutions in a fast paced and challenging environment using cutting edge technologies\n\nAbout You\n• You are a motivated team-player who works well in a highly-collaborative, agile environment\n• You have strong troubleshooting skills and the ability to deep dive into technical problems\n• You take ownership and pride in your work and are talented, reliable and thrive in a dynamic team environment\n• You like to take on challenges and learn and adopt new technologies quickly\n• You are an effective communicator who works well with cross-functional teams and across management levels\n• You are passionate about delivering solutions leveraging the best technology and software practices for our customers\n\nMinimum Qualifications\n• Bachelor's degree in Computer Science or relevant field with 8 years of related experience.\n• 5+ years professional experience as a full stack software engineer\n• Proficient with object-oriented programming and unit testing using Java / Spring Boot.\n• Proficient developing UI using React framework\n• Experience working with Linux operating system\n• Experience working with databases &amp; with large datasets\n• Knowledge of REST APIs\n\nPreferred Qualifications\n• Experience with distributed systems and n-tier architecture\n• Experience building microservices or domain oriented services\n• Experience with Docker and Kubernetes\n• Experience with NoSQL databases such as MongoDB\n• Knowledge of cloud-based infrastructure\n• Ability to act as a technical authority, to present solution options and recommendations in unbiased terms.\n\nJoin us in shaping the future of data security. Apply now and be part of a dynamic team dedicated to building innovative and robust solutions for the challenges of tomorrow!\n\nThe anticipated annual base salary range for this position is CAD $115,000 – $145,000. The salary offered will be determined based on the candidate’s experience, knowledge, skills, other qualifications, and location.\n\nOur Company\n\nImperva is an analyst-recognized, cybersecurity leader—championing the fight to secure data and applications wherever they reside. Once deployed, our solutions proactively identify, evaluate, and eliminate current and emerging threats, so you never have to choose between innovating for your customers and protecting what matters most. Imperva—Protect the pulse of your business. Learn more: www.imperva.com , our blog , on Twitter .\n\nRewards\n\nImperva offers a competitive compensation package that includes base salary, medical, flexible time off, salary continuance for adoption or birth of a child and more. It’s an exciting time to work in the security space. Check out our products and services at www.imperva.com and career opportunities at www.imperva.com/careers\n\nLegal Notice\n\nImperva is an equal opportunity employer. All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, national origin, ancestry, pregnancy, age, sexual orientation, gender identity, marital status, protected veteran status, medical condition or disability, or any other characteristic protected by law.\n\nHybrid\n\n#VL1	Vancouver, BC, Canada	Full-time		clwr7ztgl0000xzx1pxqgt0z2	2024-06-05 02:33:28.453	2024-06-05 02:33:28.453	UyxlLG4saSxvLHIsICxTLG8sZixJLG0scCxlLHIsdixhLDcsVixhLG4sYyxvLHUsdixlLHIsLCxULGg=	6 days ago
https://fonts.gstatic.com/s/i/googlematerialicons/auto_stories/v8/gm_grey-24dp/1x/gm_auto_stories_gm_grey_24dp.png	The Jibe Multimedia,Inc	software developer	Education: Secondary (high) school graduation certificate. Tasks: Write, modify, integrate and test software code. Maintain existing computer programs by making modifications as required. Communicate technical problems, processes and solutions. Assist in the collection and documentation of user's requirements. Program special effects software for film and video applications. Computer and technology knowledge: JavaScript. Experience: 2 years to less than 3 years.	Vancouver, BC, Canada	Full-time		clwr7ztgl0000xzx1pxqgt0z2	2024-06-05 02:33:28.756	2024-06-05 02:33:28.756	cyxvLGYsdCx3LGEscixlLCAsZCxULGgsZSwgLEosaSxiLGUsICxNLDIsVixhLG4sYyxvLHUsdixlLHI=	15 days ago
	Virtual Company	660-1  Embedded Software Developer	We are currently seeking an seasoned Embedded Software Developer with C/C++, Python and experience with real-time operating systems (RTOS).\n\nYou will be responsible for support the development of formal documentation in a multidisciplinary team environment (systems, digital, RF), collaborate with a team to design, code, test and support the integration of embedded codes and testing within product's units.\n\nApply to this amazing, full-time permanent Embedded Software Engineer opportunity already today and bring your career to the next level!\n\nHow do you qualify?\n\nTo qualify for the Embedded Software Engineer role you must have:\n• Bachelor’s degree in electrical or computer engineering or equivalent\n• 5+ years of experience production level experience in embedded software development\n• Experience with real-time operating systems (RTOS)\n• Programming in C, C++, Python (any previous experience with Visual Studio or Eclipse would be definitely a bonus)\n• Experience working within a... scrum-agile team\n• Hands on working knowledge with continuous integration and delivery (CI/CD)\n• Experience with version control systems such as GIT\n• Very good communication and collaboration skills (English/French)\n• Being able to work at least 2-3 days on site in Montreal (relocation across Canada and from US could be provided upon request)\n• Currently legally entitled to work in Canada\n\nIf you love collaborating with a team to design, code, test and maintain integrated embedded software using the suite of development tools then this Embedded Software Engineer role with our client could be the perfect opportunity for you!\n\nPlease contact Paul via pklimau@vaco.com for any additional information, or apply already TODAY with your resume to Gurpreet via gurpreetkaur@vaco.com	Richmond, BC, Canada	Full-time		clwr7ztgl0000xzx1pxqgt0z2	2024-06-05 02:33:30.388	2024-06-05 02:33:30.388	Niw2LDAsLSwxLCAsICxFLG0sYixWLGkscix0LHUsYSxsLCAsQyxvLDIsUixpLGMsaCxtLG8sbixkLCw=	21 days ago
\.


--
-- Data for Name: Job_Providers; Type: TABLE DATA; Schema: public; Owner: tomomori
--

COPY public."Job_Providers" (url, "jobId", id, "jobProvider") FROM stdin;
https://www.glassdoor.ca/job-listing/senior-software-developer-think-big-solutions-JV_IC2278756_KO0,25_KE26,45.htm?jl=1009284226090&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixULGgsaSxuLGssICxCLGksZywgLDIsVixhLG4sYyxvLHUsdixlLHI=	48	Glassdoor
https://www.workopolis.com/jobsearch/viewjob/pUF3x9m3yR4LuWGiM9UR2G3eZBQXT518RvT2sA_FSbfy5fY-de-1yxpETzNqY043?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixULGgsaSxuLGssICxCLGksZywgLDIsVixhLG4sYyxvLHUsdixlLHI=	49	Workopolis
https://ca.linkedin.com/jobs/view/senior-software-developer-at-fleetcor-3879782930?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixGLEwsRSxFLFQsQyxPLFIsOCxWLGEsbixjLG8sdSx2LGUsciwsLFk=	50	LinkedIn
https://ca.indeed.com/viewjob?jk=d6f444bd330ad8bb&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixGLEwsRSxFLFQsQyxPLFIsOCxWLGEsbixjLG8sdSx2LGUsciwsLFk=	51	Indeed
https://www.glassdoor.ca/job-listing/senior-software-developer-corpay-JV_IC2278756_KO0,25_KE26,32.htm?jl=1009219381866&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixGLEwsRSxFLFQsQyxPLFIsOCxWLGEsbixjLG8sdSx2LGUsciwsLFk=	52	Glassdoor
https://www.levels.fyi/jobs?jobId=115443789754966726&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixGLEwsRSxFLFQsQyxPLFIsOCxWLGEsbixjLG8sdSx2LGUsciwsLFk=	53	Levels.fyi
https://www.workopolis.com/jobsearch/viewjob/GqFY3ncDP_eDXc-Zod8SzRLJM8k7WfJRJyw2e6o9kd_oNzQF9db07RjbgVnq0upt?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixGLEwsRSxFLFQsQyxPLFIsOCxWLGEsbixjLG8sdSx2LGUsciwsLFk=	54	Workopolis
https://www.simplyhired.ca/job/s4K5bagAqVHaaA5n3Xu7gvDWsc3_TYGvazhRra0ULq-5SwWubV_Srw?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixGLEwsRSxFLFQsQyxPLFIsOCxWLGEsbixjLG8sdSx2LGUsciwsLFk=	55	SimplyHired
https://ca.jooble.org/jdp/5535948078795389964?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixGLEwsRSxFLFQsQyxPLFIsOCxWLGEsbixjLG8sdSx2LGUsciwsLFk=	56	Jooble
https://www.recruit.net/job/senior-software-developer-jobs/52683CDD5C4B899C?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixGLEwsRSxFLFQsQyxPLFIsOCxWLGEsbixjLG8sdSx2LGUsciwsLFk=	57	Recruit.net
https://careers.mastercard.com/us/en/job/R-217203/Software-Engineer-II-SDET-QA-Java?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxvLGYsdCx3LGEscixlLCAsRSxNLGEscyx0LGUscixjLGEscixkLDgsVixhLG4sYyxvLHUsdixlLHI=	58	Careers At Mastercard
https://careers.nsbe.org/job/software-engineer-ii-sdet-qa-java/73180222/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxvLGYsdCx3LGEscixlLCAsRSxNLGEscyx0LGUscixjLGEscixkLDgsVixhLG4sYyxvLHUsdixlLHI=	59	NSBE Career Center
https://www.monster.ca/job-openings/software-engineer-ii-sdet-qa-java-vancouver-02--e919212d-45e2-4ac5-a887-87a0eefdfa17?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxvLGYsdCx3LGEscixlLCAsRSxNLGEscyx0LGUscixjLGEscixkLDgsVixhLG4sYyxvLHUsdixlLHI=	60	Monster.ca
https://www.themuse.com/jobs/mastercard/software-engineer-ii-sdet-qa-java?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxvLGYsdCx3LGEscixlLCAsRSxNLGEscyx0LGUscixjLGEscixkLDgsVixhLG4sYyxvLHUsdixlLHI=	61	The Muse
https://ca.linkedin.com/jobs/view/software-engineer-ii-sdet-qa-java-at-mastercard-3890929554?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxvLGYsdCx3LGEscixlLCAsRSxNLGEscyx0LGUscixjLGEscixkLDgsVixhLG4sYyxvLHUsdixlLHI=	62	LinkedIn
https://www.levels.fyi/jobs?jobId=90274319327732422&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxvLGYsdCx3LGEscixlLCAsRSxNLGEscyx0LGUscixjLGEscixkLDgsVixhLG4sYyxvLHUsdixlLHI=	63	Levels.fyi
https://jobs.fair360.com/job/software-engineer-ii-sdet-qa-java-vancouver-british-columbia-64667143?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxvLGYsdCx3LGEscixlLCAsRSxNLGEscyx0LGUscixjLGEscixkLDgsVixhLG4sYyxvLHUsdixlLHI=	64	DiversityInc Jobs - Fair360
https://emplois.ca.indeed.com/viewjob?jk=f062acae8aefc533&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxvLGYsdCx3LGEscixlLCAsRSxNLGEscyx0LGUscixjLGEscixkLDgsVixhLG4sYyxvLHUsdixlLHI=	65	Indeed
https://www.ziprecruiter.com/c/Electronic-Arts/Job/Software-Engineer-II/-in-Vancouver,BC?jid=6d14ec48bc3137ad&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxvLGYsdCx3LGEscixlLCAsRSxFLGwsZSxjLHQscixvLG4saSxjLDMsQSxuLHksdyxoLGUscixlLFM=	74	ZipRecruiter
https://ca.jooble.org/jdp/3982343541502075310?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxvLGYsdCx3LGEscixlLCAsRSxFLGwsZSxjLHQscixvLG4saSxjLDMsQSxuLHksdyxoLGUscixlLFM=	75	Jooble
https://canada.hacendo.com/job/962301744/software-engineer-ii-vancouver/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxvLGYsdCx3LGEscixlLCAsRSxFLGwsZSxjLHQscixvLG4saSxjLDMsQSxuLHksdyxoLGUscixlLFM=	76	Hacendo.com
https://www.learn4good.com/jobs/west-vancouver/canada/software_development/3233611185/e/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxvLGYsdCx3LGEscixlLCAsRCxULG8sbyxuLGksZSwgLEgsbyxsLDEsVyxlLHMsdCwgLFYsYSxuLGM=	77	Learn4Good
https://www.ziprecruiter.com/c/FI.SPAN/Job/Senior-Software-Engineer-(Backend)/-in-Vancouver,BC?jid=c22fd560471193f7&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixGLEksLixTLFAsQSxOLDQsQSxuLHksdyxoLGUscixlLE8sdSxyLCA=	78	ZipRecruiter
https://www.itjobs.ca/en/offer/bc/vancouver/test-engineer-i-backend/90485eeb-6fc9-4d3c-8d1c-af1608c07656_en/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixGLEksLixTLFAsQSxOLDQsQSxuLHksdyxoLGUscixlLE8sdSxyLCA=	79	Itjobs.ca
https://www.jobs.ca/offer/senior-software-engineer/43a9a963-8eba-49fb-aef7-407fcf98667c_en/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixGLEksLixTLFAsQSxOLDQsQSxuLHksdyxoLGUscixlLE8sdSxyLCA=	80	Jobs.ca
https://www.recruit.net/job/software-engineer-ii-jobs/283FB953BB467D7F?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixGLEksLixTLFAsQSxOLDQsQSxuLHksdyxoLGUscixlLE8sdSxyLCA=	81	Recruit.net
https://emplois.ca.indeed.com/viewjob?jk=0c69b78ab251e5f6&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICwuLE4sRSxlLHQsaCxvLHMsNixWLGEsbixjLG8sdSx2LGUsciwsLGUsdCxoLG8=	82	Indeed
https://fr.glassdoor.ca/job-listing/senior-net-software-developer-ethos-JV_IC2278756_KO0,29_KE30,35.htm?jl=1009298652467&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICwuLE4sRSxlLHQsaCxvLHMsNixWLGEsbixjLG8sdSx2LGUsciwsLGUsdCxoLG8=	83	Glassdoor
https://www.workopolis.com/jobsearch/viewjob/cmX98gsvbO6M3T1nUlLy6-WYYxWipHQjFweHuMKFFLENaEdVbLnmfAqiv6fVHbDT?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICwuLE4sRSxlLHQsaCxvLHMsNixWLGEsbixjLG8sdSx2LGUsciwsLGUsdCxoLG8=	84	Workopolis
https://www.simplyhired.ca/job/yFmg2H-kvgORzDdzXWVXtgV_h1iP488MOjMDRXsY7uUw94oLI4m6sw?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICwuLE4sRSxlLHQsaCxvLHMsNixWLGEsbixjLG8sdSx2LGUsciwsLGUsdCxoLG8=	85	SimplyHired
https://electricgolftrolleysne.co.uk/jobs/job/senior-c-software-developer-at-ethos-multiverse-vancouver-bc-QlkrcllXVEh0UzZ3THhDMlgwTThteXorNWc9PQ==?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICwuLE4sRSxlLHQsaCxvLHMsNixWLGEsbixjLG8sdSx2LGUsciwsLGUsdCxoLG8=	86	Electric Golf Trolleys Ne
https://alexmulder.com/.library/job/senior-c-software-developer-at-ethos-multiverse-vancouver-bc-WEFJcFpBZGFqRDNwZnVhT3AyVmhiYk5jUXc9PQ==?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICwuLE4sRSxlLHQsaCxvLHMsNixWLGEsbixjLG8sdSx2LGUsciwsLGUsdCxoLG8=	87	Alex Mulder
https://ca.linkedin.com/jobs/view/senior-software-engineer-at-imperva-3938188399?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixJLG0scCxlLHIsdixhLDcsVixhLG4sYyxvLHUsdixlLHIsLCxULGg=	88	LinkedIn
https://ca.indeed.com/viewjob?jk=e2179236291f86ee&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixJLG0scCxlLHIsdixhLDcsVixhLG4sYyxvLHUsdixlLHIsLCxULGg=	89	Indeed
https://www.simplyhired.ca/job/yIGsiIHBxmArQymugWnfBa17kW60BeyphlR62BeZ364WWYRJD4CQzQ?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixJLG0scCxlLHIsdixhLDcsVixhLG4sYyxvLHUsdixlLHIsLCxULGg=	90	SimplyHired
https://www.glassdoor.ca/job-listing/senior-software-engineer-imperva-JV_IC2278756_KO0,24_KE25,32.htm?jl=1009299727122&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixJLG0scCxlLHIsdixhLDcsVixhLG4sYyxvLHUsdixlLHIsLCxULGg=	91	Glassdoor
https://ca.bebee.com/job/cea8d9a5785e9316e372deb77762444f?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixJLG0scCxlLHIsdixhLDcsVixhLG4sYyxvLHUsdixlLHIsLCxULGg=	92	BeBee Canada
https://ca.jooble.org/jdp/-255770835982975430?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixJLG0scCxlLHIsdixhLDcsVixhLG4sYyxvLHUsdixlLHIsLCxULGg=	93	Jooble
https://www.learn4good.com/jobs/vancouver/canada/software_development/3216634838/e/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	UyxlLG4saSxvLHIsICxTLG8sZixJLG0scCxlLHIsdixhLDcsVixhLG4sYyxvLHUsdixlLHIsLCxULGg=	94	Learn4Good
https://www.jobbank.gc.ca/jobsearch/jobposting/41092055?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	cyxvLGYsdCx3LGEscixlLCAsZCxULGgsZSwgLEosaSxiLGUsICxNLDIsVixhLG4sYyxvLHUsdixlLHI=	95	Job Bank
https://ca.bebee.com/job/2de418daa286203b75d4938271865fc9?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	cyxvLGYsdCx3LGEscixlLCAsZCxULGgsZSwgLEosaSxiLGUsICxNLDIsVixhLG4sYyxvLHUsdixlLHI=	96	BeBee Canada
https://jobs.vaco.com/job/15892/660_1_embedded_software_developer/en?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	Niw2LDAsLSwxLCAsICxFLG0sYixWLGkscix0LHUsYSxsLCAsQyxvLDIsUixpLGMsaCxtLG8sbixkLCw=	97	Vaco
https://www.learn4good.com/jobs/richmond/canada/software_development/3229794201/e/?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic	Niw2LDAsLSwxLCAsICxFLG0sYixWLGkscix0LHUsYSxsLCAsQyxvLDIsUixpLGMsaCxtLG8sbixkLCw=	98	Learn4Good
\.


--
-- Data for Name: PasswordResetToken; Type: TABLE DATA; Schema: public; Owner: tomomori
--

COPY public."PasswordResetToken" (id, "userId", token, expires) FROM stdin;
clwst25iv00017b7769bizhiy	clwssq0gm0000qgi4fc7y6tju	ac8b394a-db80-47ca-b344-1ce40538ed7e	2024-05-30 06:19:03.029
clwstcw7e00037b77efmv6910	clwssq0gm0000qgi4fc7y6tju	3310fc69-dccd-45fb-b9ec-2c2f7663e040	2024-05-30 06:27:24.168
clwstoa240001fqx54rtob3jx	clwssq0gm0000qgi4fc7y6tju	cc0dd70e-2e88-4397-a075-45d679ac019e	2024-05-30 06:36:15.338
clwstojsn0003fqx5d5gqkms3	clwssq0gm0000qgi4fc7y6tju	373aa163-55e6-4cdf-94ca-808cb707a859	2024-05-30 06:36:27.958
clwstq5sc000113sp3kls6oqo	clwssq0gm0000qgi4fc7y6tju	6c38ec8f-d266-4ac4-b3ac-4c02c5ef745b	2024-05-30 06:37:43.115
clwsts28v000313spv6vv973l	clwssq0gm0000qgi4fc7y6tju	5f4be5c8-fd0b-459a-919b-067b7d5cca55	2024-05-30 06:39:11.839
clwsu2u01000513spowb4w5cf	clwssq0gm0000qgi4fc7y6tju	88bf17d2-0f41-44a5-ba7e-e780eb1ddda0	2024-05-30 06:47:34.368
clwsupmt2000713sp4z57rb11	clwssq0gm0000qgi4fc7y6tju	c3108805-ab87-4f7c-9fd1-c5467f9d1e9b	2024-05-30 06:17:18.133
clwsvehc5000913spkk92v1ag	clwssq0gm0000qgi4fc7y6tju	3c0e9428-5ff3-4636-b81f-cb76165a4d36	2024-05-30 06:36:37.444
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: tomomori
--

COPY public."Session" ("sessionToken", "userId", expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: tomomori
--

COPY public."User" (id, email, name, image, "createdAt", "emailVerified", "updatedAt", password, description, gender, linkedin, personal_site) FROM stdin;
clwr7ztgl0000xzx1pxqgt0z2	test@gmail.com	Nina	https://utfs.io/f/e973cca5-a573-4941-940d-779a3e284a7f-20h4e.jpg	2024-05-29 02:41:35.973	\N	2024-06-02 07:02:26.473	$2b$10$t.324ay0uDrdqtDo5hutyeJta5qh7aI3j4Gj8V.qgHUAWB0uoMgra	New description changed!	Male		
clwssq0gm0000qgi4fc7y6tju	buhuiyonggou331@gmail.com	Anonymous	/public/default_portrait.jpg	2024-05-30 05:09:36.598	\N	2024-05-30 05:09:36.598	$2b$10$IVlGTY3ySm7NnjSoIJ6xL.tHJ55ZgbvqLbCPArzCQWPoFiQkqin6u	\N	\N	\N	\N
clwu599i2000010jw6jm2pxfj	maruko@gmail.com	Anonymous	/public/default_portrait.jpg	2024-05-31 03:48:16.347	\N	2024-05-31 03:48:16.347	$2b$10$7zRrLGKL/IM.nFFASrxl2.YUVAABz87MTkIqe6wWSa.1hRHDkRfA.	\N	\N	\N	\N
clwpxqhdz0000euxyux4gizzt	yangli4944@gmail.com	Yang Li	https://utfs.io/f/52706ae4-6044-4a2b-ac28-91a1e9c7fb34-ho64me.jpg	2024-05-28 05:06:38.088	\N	2024-06-05 16:24:57.137	$2b$10$ZauzSxlwvCsa0Zg.0d7PhO1f0F2/gWSIYT8UJa/oXP5koELNWRw9.	rock band cry			
clwvrtd0b0000q89sscpppwu3	test2@gmail.com	Sakiko-dark	https://utfs.io/f/dffc6396-df17-468d-925a-de7f3b7803e1-f1mwz4.png	2024-06-01 07:07:31.739	\N	2024-06-05 17:43:15.067	$2b$10$yApp17g8aMYPwC2uIfzXueNsRJmU.QezE6nSePutr1evb257gckMm	sakiko	Female		
clx3vtd3d0000rfnfeitq3sbx	nagisa4944@gmail.com	nagisa ku	https://lh3.googleusercontent.com/a/ACg8ocIoTlWWZYbNUE8yeY3yycP3H47M1_uef8Rv2XLDtx9Rm22Zg4I=s96-c	2024-06-06 23:21:39.721	\N	2024-06-06 23:21:39.721	\N	\N	\N	\N	\N
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: tomomori
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: tomomori
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
74e3e1a4-a213-4556-8b52-c4ef44d0c50d	570f699a4ed39a5ae86fee6d29bcce5d57cd2e0f13f2634fb43edaf5e513943c	2024-05-24 16:39:57.908924-07	20240314202613_simplify_status_by_removing_hired	\N	\N	2024-05-24 16:39:57.892622-07	1
3b2d8a66-5ff2-410c-8385-06be643d5595	3e13e608eddf22c0adf4ac7dd63945e5ddf5336375c18c6d08e698bb2ac26cbe	2024-05-24 16:39:57.912041-07	20240328065012_add_job_info_and_tracker_link	\N	\N	2024-05-24 16:39:57.909747-07	1
f85ef5b3-40f1-4152-8bb4-811824386b22	f75c862da9a58edfa612f349bbbd7d0a22fd70f577dc9957658e219bce871049	2024-05-28 12:45:46.647985-07	20240528194546_add_features_of_users	\N	\N	2024-05-28 12:45:46.645598-07	1
c53ab786-89e1-4c1b-bc84-cf36c4b48eb9	84f13e1dbdc483df41b8676b68ebef1895239bebd222de43a902e668017337e6	2024-05-24 16:39:57.915057-07	20240329055817_comment_users	\N	\N	2024-05-24 16:39:57.912644-07	1
846096ae-eb5a-4d40-b654-6a89d0de5077	62293b0dc8f53c5bcc0c2cf49928d054d03246f3f4bf7dd06840736a4dc4d8b1	2024-05-24 16:39:57.917437-07	20240329062732_change_property_name_to_track_link	\N	\N	2024-05-24 16:39:57.915585-07	1
25f34c07-3830-4d20-8bbf-be2e9bdf2c2e	8119ae12b79a333d69c47eb41651cefa2076b0bdd9fc98ac92eefdae76473cb7	2024-06-03 21:39:01.414107-07	20240604043901_modify_id_or_job_providers	\N	\N	2024-06-03 21:39:01.409396-07	1
4256186e-3ca3-4f55-9a87-4d55e08e05ab	272b118360233d2e8d3a51465808dcd150be87d2d9f2d90296627c28ec0e47b0	2024-05-24 16:39:57.919951-07	20240330003150_	\N	\N	2024-05-24 16:39:57.917947-07	1
e46c01b5-64dd-420a-968b-eeccc8bfe7d6	792bd7232529b31e8115e5e2448650d7f1c2345f8862f22dcd8ec94982de36d6	2024-05-28 12:51:28.370263-07	20240528195128_take_name_anonymous_in_default	\N	\N	2024-05-28 12:51:28.366543-07	1
b73b6671-71df-4cda-9a55-d5431b7d0fe3	fd4e0bc05f88c09f2080817083e26ab814716f446f6309e4c0520f192fd6163e	2024-05-24 16:39:57.935111-07	20240331191752_modify_model_application_and_user	\N	\N	2024-05-24 16:39:57.92049-07	1
8a6e4f6b-791d-4546-b86d-ea4a6c1a01ad	eed886ec85b65f0deb6d85ae3a6e0a02d66ae20ec02ddd59d931a3a1f1a397b0	2024-05-24 16:39:57.937184-07	20240404172751_add_pending_status	\N	\N	2024-05-24 16:39:57.935646-07	1
6753f155-605a-4794-9e4c-92731923a5b6	1b5e2da4047cef14f8bafbdb2d11019a8a9ed5e3d75357ec72fbce50bdfd8e10	2024-05-24 16:39:57.939474-07	20240524183952_change_status_to_app_status_to_avoid_conflicts	\N	\N	2024-05-24 16:39:57.937625-07	1
a68f8364-3e50-4a41-b350-231627dbe310	7d6f319d0389ce1116787db8f95775b5d782f31e72db7f9fb4d5c0ef49e69ada	2024-05-29 21:31:16.295017-07	20240530043116_provide_password_reset_token	\N	\N	2024-05-29 21:31:16.2816-07	1
506864f9-cfa0-4a74-af1c-a422d1651a1e	38d218c48dcd49eb91d155d9ca665878949125f5a24f865f1f0a8cbc86ac2d5f	2024-05-24 16:39:57.941809-07	20240524184358_change_back_to_status	\N	\N	2024-05-24 16:39:57.93997-07	1
f0485a9a-c103-4575-a4f3-ec76ff4a59f3	64e7a567d699154437a1bca991bf91f4316d31f771056bf55502d555fc002570	2024-05-24 16:39:57.950221-07	20240524233919_	\N	\N	2024-05-24 16:39:57.94228-07	1
1cebab72-2dd6-4b38-83bd-e842d5d1d4c2	4a82884ca91fe9c9e3771419c68a89c872d4b10436348d947011304f5e10bd71	2024-05-26 16:22:48.359903-07	20240526232248_update_user_image	\N	\N	2024-05-26 16:22:48.356847-07	1
e8cb72f7-290f-4f38-92d7-338c75548955	e00b14a0970d7ae03968c919f81afcfb2669a806e90a2b9038dbbf1c1665a019	2024-06-02 09:51:48.733214-07	20240602165148_remove_indices	\N	\N	2024-06-02 09:51:48.724385-07	1
cda36855-4ecc-409b-8752-c72fad26c740	278ec0f88aa3275ae155562e96391934f03246d64d824538f7b84e757702b7c7	2024-05-27 22:01:36.203244-07	20240528050136_add_authorization	\N	\N	2024-05-27 22:01:36.183833-07	1
b6c08b46-c4f1-4293-b9b4-401ce32f9703	ab80a534dfa4779eeae4ae5aeac192eea19b283671d6083c8f112e3c8a4229df	2024-05-28 12:32:44.159516-07	20240528193244_add_password_for_database_authen	\N	\N	2024-05-28 12:32:44.15745-07	1
e8a85ce0-74f8-4cae-b76e-974c503ad0b3	4c8beb439eef688cd53b217a009c2b88456cf55e138bd4f7373f30d99104cc9a	2024-06-03 22:03:12.991129-07	20240604050312_update_job_provider_as_the_recruitment	\N	\N	2024-06-03 22:03:12.988012-07	1
96fa7302-d8ae-4d28-b34f-33f7c7d7c3cf	5672b1a95d48f39239b84eb62d4b789eb88eb42ff576c7601d28f62eadafc4bf	2024-06-03 21:02:14.348047-07	20240604040214_create_model_job_collection_and_job_proviers	\N	\N	2024-06-03 21:02:14.333207-07	1
de7e1dd8-3ad4-4b76-baac-2fc38e9b8e51	6ac5cda84f07b4bef30a3ad235d1e89e5153ff9a0214aff2a76d1c97747eb8a8	2024-06-03 21:03:32.027553-07	20240604040332_modify_features_of_job_collection	\N	\N	2024-06-03 21:03:32.025103-07	1
eec9c19e-f0f1-4864-88b3-0ffa848f92d1	d405de5d3275e1c22e7cc0cf75f7ce1959759f92f4042c94641024106bbd3490	2024-06-03 21:30:17.106866-07	20240604043017_change_job_id_to_int	\N	\N	2024-06-03 21:30:17.093612-07	1
0528c968-ab4b-459f-a051-f9ab6a72482e	16b6cad3565cc1215abd73e93595e347fc346bbb30a6839e701c33741498cbae	2024-06-03 22:20:22.676544-07	20240604052022_modify_variable_name_in_prisma	\N	\N	2024-06-03 22:20:22.672804-07	1
b9da1cdc-ef99-4e59-82e3-9bbf4726e8b9	fffd8cf102c3534b05482cc1192556005b62d1b848f3268ef3e997abcb702b88	2024-06-03 21:35:02.886891-07	20240604043502_change_back_id_to_string	\N	\N	2024-06-03 21:35:02.878513-07	1
973b9671-ceaa-4470-ab18-efe6616c8155	d3bd58b479976d13fc5fb77c373b6d114f459dc6374628e9fbb89127db859d4f	2024-06-04 12:53:53.51002-07	20240604195353_add_update_at_for_application	\N	\N	2024-06-04 12:53:53.50716-07	1
\.


--
-- Name: Application_application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tomomori
--

SELECT pg_catalog.setval('public."Application_application_id_seq"', 22, true);


--
-- Name: Job_Providers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tomomori
--

SELECT pg_catalog.setval('public."Job_Providers_id_seq"', 98, true);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (provider, "providerAccountId");


--
-- Name: Application Application_pkey; Type: CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."Application"
    ADD CONSTRAINT "Application_pkey" PRIMARY KEY (application_id);


--
-- Name: Job_Collection Job_Collection_pkey; Type: CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."Job_Collection"
    ADD CONSTRAINT "Job_Collection_pkey" PRIMARY KEY (id);


--
-- Name: Job_Providers Job_Providers_pkey; Type: CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."Job_Providers"
    ADD CONSTRAINT "Job_Providers_pkey" PRIMARY KEY (id);


--
-- Name: PasswordResetToken PasswordResetToken_pkey; Type: CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VerificationToken VerificationToken_pkey; Type: CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (identifier, token);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: PasswordResetToken_token_key; Type: INDEX; Schema: public; Owner: tomomori
--

CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON public."PasswordResetToken" USING btree (token);


--
-- Name: PasswordResetToken_userId_idx; Type: INDEX; Schema: public; Owner: tomomori
--

CREATE INDEX "PasswordResetToken_userId_idx" ON public."PasswordResetToken" USING btree ("userId");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: tomomori
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: Session_userId_idx; Type: INDEX; Schema: public; Owner: tomomori
--

CREATE INDEX "Session_userId_idx" ON public."Session" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: tomomori
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- PostgreSQL database dump complete
--

