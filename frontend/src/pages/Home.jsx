
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
            descricao: "Uma adolescente de personalidade forte enfrenta os conflitos da juventude, os problemas familiares e as incertezas sobre seu futuro enquanto tenta encontrar seu próprio caminho e conquistar sua independência.",
            capa: "https://image.tmdb.org/t/p/w500/iySFtKLrWvVzXzlFj7x1zalxi5G.jpg"
        },
        {
            id: 3,
            titulo: "O Fantástico Sr. Raposo",
            genero: "Animação / Aventura / Comédia",
            ano: "2009",
            descricao: "Após abandonar a vida de ladrão para cuidar da família, o Sr. Raposo volta a atacar fazendas e acaba colocando toda a comunidade animal em perigo ao enfrentar três fazendeiros.",
            capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfnmlCJ6PJIT4XM_VDUD_LYIK-DpkWeAT4Rw8VEHojHiEYJ0bL4EGmrO_Q&s=10"
        },
        {
            id: 4,
            titulo: "O Labirinto do Fauno",
            genero: "Fantasia / Drama",
            ano: "2006",
            descricao: "Durante a Espanha franquista, uma menina chamada Ofélia descobre um misterioso mundo fantástico e recebe três tarefas de uma criatura enigmática. Enquanto enfrenta um ambiente marcado pela violência e pela guerra, ela encontra refúgio em um universo de magia e criaturas extraordinárias.",
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
            descricao: "Uma versão sombria e emocionante da história do boneco de madeira que ganha vida.",
            capa: "https://image.tmdb.org/t/p/w500/vx1u0uwxdlhV2MUzj4VlcMB0N6m.jpg"
        },
        {
            id: 7,
            titulo: "Corra!",
            genero: "Terror / Suspense",
            ano: "2017",
            descricao: "Um jovem visita a família de sua namorada e começa a perceber comportamentos muito estranhos.",
            capa: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg"
        },
        {
            id: 8,
            titulo: "Tudo em Todo Lugar ao Mesmo Tempo",
            genero: "Ficção científica / Aventura",
            ano: "2022",
            descricao: "Uma imigrante chinesa enfrenta problemas familiares e financeiros até descobrir que precisa explorar diferentes universos para salvar o multiverso.",
            capa: "https://m.media-amazon.com/images/M/MV5BM2QzNjc2ZWQtNDcwOC00NzUyLWE5NzMtY2YwMjVjOWZlYjMxXkEyXkFqcGc%40._V1_.jpg"
        },
        {
            id: 9,
            titulo: "Close",
            genero: "Drama",
            ano: "2022",
            descricao: "Dois amigos muito próximos enfrentam as dificuldades da adolescência quando a pressão social começa a afetar a relação entre eles.",
            capa: "https://br.web.img3.acsta.net/pictures/23/01/31/18/20/2409930.jpg"
        },
        {
            id: 10,
            titulo: "Sociedade dos Poetas Mortos",
            genero: "Drama",
            ano: "1989",
            descricao: "Um professor de literatura inspira seus alunos a questionarem as regras da sociedade e aproveitarem a vida por meio da poesia e do pensamento crítico.",
            capa: "https://ccs2.ufpel.edu.br/wp/wp-content/uploads/2017/07/Sociedade-dos-poetas-mortos.jpg"
        },
        {
            id: 11,
            titulo: "Clube dos Cinco",
            genero: "Comédia dramática",
            ano: "1985",
            descricao: "Cinco estudantes com personalidades diferentes precisam passar um sábado juntos na detenção e acabam descobrindo muito mais em comum do que imaginavam.",
            capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTphwuyfNRvJVL1R76VIuKgPRQEk_KYhRfX4JsFiKdgfBXRxrv9rYShI5g&s=10"
        },
        {
            id: 12,
            titulo: "De Volta para o Futuro",
            genero: "Ficção científica / Aventura",
            ano: "1985",
            descricao: "Um adolescente viaja acidentalmente para o passado em uma máquina do tempo e precisa garantir que seus pais se conheçam para não comprometer sua própria existência.",
            capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYr9t7H5WmQfggg7Dy3U2-GB0Bq6AdlEdFQZH-pFZKVCeaSFMjJa5sp4Zf&s=10"
        },
        {
            id: 13,
            titulo: "Paris, Texas",
            genero: "Drama",
            ano: "1984",
            descricao: "Após anos desaparecido, um homem retorna à sociedade e tenta reconstruir sua relação com o filho e reencontrar sua esposa, enquanto enfrenta seu próprio passado.",
            capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAGUOYkYkC5LWG5ua7XRV6pQcdZk4kxg8dtfLSKCDt8NOEV2Pg0y9-8lPB&s=10"
        },
        {
            id: 14,
            titulo: "O Grande Ditador",
            genero: "Comédia / Drama",
            ano: "1940",
            descricao: "Um barbeiro judeu perde a memória durante a guerra e, anos depois, é confundido com um ditador autoritário. Em meio à perseguição e à opressão, ele acaba tendo a oportunidade de transmitir uma mensagem de humanidade e liberdade.",
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
