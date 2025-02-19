--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-02-11 12:24:32

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
-- TOC entry 6 (class 2615 OID 16492)
-- Name: productos; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA productos;

ALTER SCHEMA productos OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16497)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(150) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    imagen_url text
);

ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16496)
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.productos_id_seq OWNER TO postgres;

--
-- TOC entry 4852 (class 0 OID 0)
-- Dependencies: 218
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;

--
-- TOC entry 4696 (class 2604 OID 16500)
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);

--
-- TOC entry 4846 (class 0 OID 16497)
-- Dependencies: 219
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id, nombre, descripcion, precio, stock, imagen_url) FROM stdin;
1	iMac	Capacidad de Disco: Estado Solido SSD 256GB	9000000.00	10	\\N
2	MacBook Pro	Chip: M3	7189000.00	8	\\N
3	Mac Mini	Chip: M2	2189000.00	12	\\N
4	HP Celeron J4025	Memoria RAM: 4GB, Almacenamiento: HDD 1TB, Pantalla: FHD	1500000.00	15	\\N
5	Portatil HP Pavilion	Procesador: Intel Core i5, Memoria RAM: 8GB, Almacenamiento: 256GB SSD	2500000.00	10	\\N
6	Portatil Tactil HP Pavilion	Procesador: Intel Core i5 1235U, Memoria RAM: 8GB, Almacenamiento: 512GB SSD	3200000.00	4	\\N
7	Dell Inspiron 3520	Procesador: Intel Core i7 1255U, Memoria RAM: 16GB, Almacenamiento: 512GB SSD	4500000.00	6	\\N
8	Dell Latitude 3410	Procesador: Intel Core i5, Memoria RAM: 8GB, Almacenamiento: 1TB HDD	3800000.00	9	\\N
9	Dell Vostro 3681	Procesador: Intel Core i3, Memoria RAM: 4GB, Almacenamiento: 1TB HDD	2800000.00	12	\\N
10	iMac	Capacidad de Disco: Estado Solido SSD 256GB	9000000.00	10	\\N
11	MacBook Pro	Chip: M3	7189000.00	8	\\N
12	Mac Mini	Chip: M2	2189000.00	12	\\N
13	HP Celeron J4025	Memoria RAM: 4GB, Almacenamiento: HDD 1TB, Pantalla: FHD	1500000.00	15	\\N
14	Portatil HP Pavilion	Procesador: Intel Core i5, Memoria RAM: 8GB, Almacenamiento: 256GB SSD	2500000.00	10	\\N
15	Portatil Táctil HP Pavilion	Procesador: Intel Core i5 1235U, Memoria RAM: 8GB, Almacenamiento: 512GB SSD	3200000.00	4	\\N
16	Dell Inspiron 3520	Procesador: Intel Core i7 1255U, Memoria RAM: 16GB, Almacenamiento: 512GB SSD	4500000.00	6	\\N
17	Dell Latitude 3410	Procesador: Intel Core i5, Memoria RAM: 8GB, Almacenamiento: 1TB HDD	3800000.00	9	\\N
18	Dell Vostro 3681	Procesador: Intel Core i3, Memoria RAM: 4GB, Almacenamiento: 1TB HDD	2800000.00	12	\\N
\.

--
-- TOC entry 4853 (class 0 OID 0)
-- Dependencies: 218
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_seq', 18, true);

--
-- TOC entry 4699 (class 2606 OID 16505)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);

-- Completed on 2025-02-11 12:24:33

--
-- PostgreSQL database dump complete
--