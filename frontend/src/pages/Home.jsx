import CardFilme from "../components/CardFilme";
import "./Home.css";

function Home() {

    
const filmes = [
    {
        id: 1,
        titulo: "O Grande Hotel Budapeste",
        genero: "Comédia / Aventura",
        ano: "2014",
        descricao: "Um gerente de hotel e seu jovem funcionário se envolvem em uma história de roubo, mistério e herança.",
        capa: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg"
    },
    {
        id: 2,
        titulo: "Lady Bird: A Hora de Voar",
        genero: "Drama / Comédia",
        ano: "2017",
        descricao: "Uma adolescente enfrenta conflitos familiares e os desafios da juventude enquanto busca sua independência.",
        capa: "https://image.tmdb.org/t/p/w500/iySFtKLrWvVzXzlFj7x1zalxi5G.jpg"
    },
    {
        id: 3,
        titulo: "O Fantástico Sr. Raposo",
        genero: "Animação / Aventura / Comédia",
        ano: "2009",
        descricao: "Uma raposa volta à vida de ladrão e coloca sua família e toda a comunidade animal em perigo.",
        capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfnmlCJ6PJIT4XM_VDUD_LYIK-DpkWeAT4Rw8VEHojHiEYJ0bL4EGmrO_Q&s=10"
    },
    {
        id: 4,
        titulo: "O Labirinto do Fauno",
        genero: "Fantasia / Drama",
        ano: "2006",
        descricao: "Durante a guerra na Espanha, uma menina descobre um mundo fantástico repleto de criaturas misteriosas.",
        capa: "https://m.media-amazon.com/images/M/MV5BOTc1NTAxMWItMWFlNy00MmU2LTkwMTMtNzMwOTg5OTQ5YTFiXkEyXkFqcGc%40._V1_.jpg"
    },
    {
        id: 5,
        titulo: "A Forma da Água",
        genero: "Fantasia / Romance",
        ano: "2017",
        descricao: "Uma funcionária de um laboratório secreto desenvolve uma relação especial com uma criatura misteriosa.",
        capa: "https://image.tmdb.org/t/p/w500/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg"
    },
    {
        id: 6,
        titulo: "Pinóquio",
        genero: "Animação / Fantasia",
        ano: "2022",
        descricao: "Uma versão sombria da história de um boneco de madeira que ganha vida e descobre o mundo.",
        capa: "https://image.tmdb.org/t/p/w500/vx1u0uwxdlhV2MUzj4VlcMB0N6m.jpg"
    },
    {
        id: 7,
        titulo: "Corra!",
        genero: "Terror / Suspense",
        ano: "2017",
        descricao: "Um jovem visita a família de sua namorada e descobre comportamentos cada vez mais assustadores.",
        capa: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg"
    },
    {
        id: 8,
        titulo: "Tudo em Todo Lugar ao Mesmo Tempo",
        genero: "Ficção científica / Aventura",
        ano: "2022",
        descricao: "Uma imigrante precisa explorar diferentes universos para salvar o multiverso e sua própria família.",
        capa: "https://m.media-amazon.com/images/M/MV5BM2QzNjc2ZWQtNDcwOC00NzUyLWE5NzMtY2YwMjVjOWZlYjMxXkEyXkFqcGc%40._V1_.jpg"
    },
    {
        id: 9,
        titulo: "Close",
        genero: "Drama",
        ano: "2022",
        descricao: "Dois amigos enfrentam os desafios da adolescência quando a pressão social afeta sua amizade.",
        capa: "https://br.web.img3.acsta.net/pictures/23/01/31/18/20/2409930.jpg"
    },
    {
        id: 10,
        titulo: "Sociedade dos Poetas Mortos",
        genero: "Drama",
        ano: "1989",
        descricao: "Um professor inspira seus alunos a questionarem as regras e enxergarem a vida de outra maneira.",
        capa: "https://ccs2.ufpel.edu.br/wp/wp-content/uploads/2017/07/Sociedade-dos-poetas-mortos.jpg"
    },
    {
        id: 11,
        titulo: "Clube dos Cinco",
        genero: "Comédia dramática",
        ano: "1985",
        descricao: "Cinco estudantes diferentes se conhecem durante uma detenção e descobrem suas semelhanças.",
        capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTphwuyfNRvJVL1R76VIuKgPRQEk_KYhRfX4JsFiKdgfBXRxrv9rYShI5g&s=10"
    },
    {
        id: 12,
        titulo: "De Volta para o Futuro",
        genero: "Ficção científica / Aventura",
        ano: "1985",
        descricao: "Um adolescente viaja ao passado e precisa garantir que seus pais se conheçam para preservar seu futuro.",
        capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYr9t7H5WmQfggg7Dy3U2-GB0Bq6AdlEdFQZH-pFZKVCeaSFMjJa5sp4Zf&s=10"
    },
    {
        id: 13,
        titulo: "Paris, Texas",
        genero: "Drama",
        ano: "1984",
        descricao: "Após anos desaparecido, um homem retorna e tenta reconstruir os laços com seu filho e sua esposa.",
        capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAGUOYkYkC5LWG5ua7XRV6pQcdZk4kxg8dtfLSKCDt8NOEV2Pg0y9-8lPB&s=10"
    },
    {
        id: 14,
        titulo: "O Grande Ditador",
        genero: "Comédia / Drama",
        ano: "1940",
        descricao: "Um barbeiro judeu é confundido com um ditador e tem a oportunidade de defender a liberdade e a humanidade.",
        capa: "https://image.tmdb.org/t/p/w500/1QpO9wo7JWecZ4NiBuu625FiY1j.jpg"
    }
];


    return (
        <div className="home">

            <section className="home-introducao">
                <h1>Bem-vindo ao CineMatch</h1>

                <p>
                    Descubra novos filmes, conheça histórias diferentes
                    e encontre seu próximo filme favorito.
                </p>
            </section>

            <section className="home-filmes">

                <h2>Filmes em destaque</h2>

                <div className="lista-filmes">

                    {filmes.map((filme) => (
                        <CardFilme
                            key={filme.id}
                            titulo={filme.titulo}
                            genero={filme.genero}
                            ano={filme.ano}
                            descricao={filme.descricao}
                            capa={filme.capa}
                        />
                    ))}

                </div>

            </section>

        </div>
    );
}

export default Home;
