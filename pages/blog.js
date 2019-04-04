import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import ReactSafeHtml from 'react-safe-html'
import BlogService from '../services/BlogService.js'

const Blog = (props) => (
    <Layout>
        <h1>Blog</h1>
        <ul>
            {props.items.map(item => (
                <li>
                    <a href={item.link} target="_blank"><h3>{item.title}</h3></a>
                    <br/>
                    <img src={item.thumbnail} alt={item.title} width="200px"/>
                    <p>
                        <ReactSafeHtml html={item.description}/>
                    </p>
                    <a href={item.link} target="_blank">Read more...</a>
                </li>
            ))}
        </ul>
    </Layout>
)

Blog.getInitialProps = async function () {
    const blogService = new BlogService();
    return blogService.get_blogs()
};

export default Blog