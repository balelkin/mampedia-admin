import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import * as ControlledEditor from "react-codemirror2";
import {Card, CardActions, CardContent, CardMedia, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import 'codemirror/lib/codemirror.css';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkMjg3OWVmLWRiNTEtNGY4NC05OGQ5LWM0M2U3MTdjYzhkYiIsImVtYWlsIjoiYmFsZWxraW5uQGdtYWlsLmNvbSIsIm1lbWJlcnNoaXBUeXBlIjoiUEFJRCIsInJvbGVzIjpbIlVTRVIiXSwic2Vzc2lvbklkIjoiZDY0ODNjYzgtNGJjMy00NGE3LWE4ZTctNzBlMzRmZTI1NzZkIiwiaWF0IjoxNzA4MDgxNjA5LCJleHAiOjE3OTQ0ODE2MDl9.FYokARckHcHIMZPrW6udLyoYdY_yoZMaU1C27XiXEqQ';
const baseUrl = 'https://api.mampediaapp.com/api/v1';
function ProgramList() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get(`${baseUrl}/programs`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });
                setPrograms(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching programs:', error);
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Program Categories">
                {programs.map((program, index) => (
                    <Tab key={index} label={program.title} />
                ))}
            </Tabs>
            {programs.map((program, index) => (
                <TabPanel key={index} value={selectedTab} index={index} program={program} />
            ))}
        </Box>
    );
}

function TabPanel(props) {
    const { value, index, program } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <Program program={program} />
            )}
        </div>
    );
}

function Program({ program }) {
    const { programCategories } = program;

    return (
        <div>
            {/*<h2>{program.title}</h2>*/}
            {/*<h3>Categories</h3>*/}
            <ul>
                {programCategories.map(category => (
                    <Category key={category.id} category={category} />
                ))}
            </ul>
        </div>
    );
}

function Category({ category }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editorData, setEditorData] = useState('');
    const [clickedData, setClickedData] = useState(null);
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`${baseUrl}/articles/category/${category.id}`, {
                    headers: {
                        Method: 'GET',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });
                setArticles(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching articles:', error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, [category.id]);

    if (loading) {
        return <div>Loading articles...</div>;
    }

    const itemsPerRow = 5;

// Розділіть елементи на групи по itemsPerRow
    const rows = [];
    for (let i = 0; i < articles.length; i += itemsPerRow) {
        rows.push(articles.slice(i, i + itemsPerRow));
    }

    return (
        <li>
            <h4>{category.title}</h4>
            <div>
                {rows.map((row, index) => (
                    <div key={index} style={{display: 'flex', marginBottom: '10px'}}>
                        {row.map(article => (
                            <div key={article.id} style={{marginRight: '10px', flex: '1 0 calc(20% - 10px)', width: '300px'}}>
                                {/*<h5>{article.title}</h5>*/}
                                <ImgMediaCard article={article}/>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </li>
    );
}

function ImgMediaCard({ article }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(article.title);
    const [imageUrl, setImageUrl] = useState(article.picture);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const body = {
            title,
            picture: imageUrl,
        }
        console.log('body:', body);
        axios.patch(`${baseUrl}/articles/${article.id}`, body, {
        // axios.patch(`https://onix-systems-mampedia-backend.staging.onix.ua/api/v1/articles/807e4523-ff6e-4019-9b75-65d69efc7b88`, {}, {
            headers: {
                Method: 'PATCH',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
               'Content-Security-Policy': 'default-src *; script-src *; connect-src *; img-src *; style-src *; frame-src *; font-src *; media-src *;',
            },
            mode: 'no-cors',
            // withCredentials: true,
        }).then(response => {
            console.log('Article updated:', response.data);
        }).catch(error => {
            console.error('Error updating article:', error);
        });
        handleClose();
        // window.location.reload();
    };

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={article.picture ? article.picture.peplace('original', 'small') : ''}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {article.title}
                    </Typography>
                    <Button onClick={handleOpen}>Edit</Button>
                </CardContent>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-modal-title"
                aria-describedby="edit-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        width: 400,
                    }}
                >

                    <Typography id="edit-modal-title" variant="h6" component="h2" gutterBottom>
                        Edit Article
                    </Typography>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <CardMedia
                        component="img"
                        alt={title}
                        height="140"
                        image={imageUrl}
                    />
                    <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
                </Box>
            </Modal>
        </div>
    );
}


export default ProgramList;
