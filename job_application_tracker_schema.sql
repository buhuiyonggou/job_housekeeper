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
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Application Application_assignedToUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."Application"
    ADD CONSTRAINT "Application_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Job_Collection Job_Collection_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."Job_Collection"
    ADD CONSTRAINT "Job_Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Job_Providers Job_Providers_jobId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."Job_Providers"
    ADD CONSTRAINT "Job_Providers_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES public."Job_Collection"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PasswordResetToken PasswordResetToken_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tomomori
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

