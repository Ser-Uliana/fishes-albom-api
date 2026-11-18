--
-- PostgreSQL database dump
--

\restrict 107oPFaP4OVYd3JRrCRxKIOYaPcwOPhtRa7VOEpZXTpQ9IqaTERNYitcQ8PoNPP

-- Dumped from database version 18.6 (Postgres.app)
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: FishType; Type: TABLE DATA; Schema: public; Owner: ulianaserbina
--

INSERT INTO public."FishType" (id, name, color) VALUES (1, 'Коропові', '#ef4444');
INSERT INTO public."FishType" (id, name, color) VALUES (2, 'Хижі', '#f97316');
INSERT INTO public."FishType" (id, name, color) VALUES (3, 'Окуневі', '#22c55e');
INSERT INTO public."FishType" (id, name, color) VALUES (4, 'Лососеві', '#3b82f6');
INSERT INTO public."FishType" (id, name, color) VALUES (5, 'Сомові', '#a855f7');


--
-- Name: FishType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ulianaserbina
--

SELECT pg_catalog.setval('public."FishType_id_seq"', 5, true);


--
-- PostgreSQL database dump complete
--

\unrestrict 107oPFaP4OVYd3JRrCRxKIOYaPcwOPhtRa7VOEpZXTpQ9IqaTERNYitcQ8PoNPP

