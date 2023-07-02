"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Input,
  ListItemSecondaryAction,
  Checkbox
} from '@material-ui/core';

export default function MainContainer() {
  type issuesType = {
    id: number,
    content: string
  }[];

  const [createissue, setCreateissue] = useState("");
  const [issues, setIssues] = useState<issuesType>([]);
  const [updateissue, setUpdateissue] = useState("");

  const createIssue = (event: any) => {
    console.log("イベント発火")
    axios.post('http://localhost:3000/tasks',
      {
        content: createissue
      }
    ).then(response => {
      console.log("registration response", response.data)
      setIssues([...issues, {
        id: response.data.id,
        content: response.data.content
      }])
      resetTextField()
    }).catch(error => {
      console.log("registration error", error)
    }).catch(data => {
      console.log(data)
    })
    event.preventDefault()
  }

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:3000/tasks',)
      console.log(result)
      console.log(result.data)
      setIssues(result.data);
    }
    fetchData();
  }, []);

  const deleteIssue = (id: number) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(response => {
        setIssues(issues.filter(x => x.id !== id))
        console.log("set")
      }).catch(data => {
        console.log(data)
      })
  }

  const updateIssue = (id: number) => {
    axios.patch(`http://localhost:3000/tasks/${id}`,
      {
        content: updateissue
      }
    ).then(response => {
      setIssues(issues.filter(x => x.id !== id))
      console.log(response.data)
    }).catch(data => {
      console.log(data)
    })
  }

  const resetTextField = () => {
    setCreateissue('')
  }
  
  const handleUpdate = (event: any) => {
    console.log(event.target.value);
    setUpdateissue(event.target.value)
  }

  return (
    <React.Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <form onSubmit={createIssue}>
          <Input
            type="text"
            name="issue"
            value={createissue}
            placeholder="Enter text"
            onChange={event => setCreateissue(event.target.value)}
          />
          <Button
            type="submit"
            variant='contained'
            color='primary'>
            つぶやく
          </Button>
        </form>
        <List
          style={{ marginTop: '48px' }}
          component='ul'
        >
          {issues.map(item => (
            <ListItem key={item.id} component='li' >
              <Checkbox
                value='primary'
                onChange={() => deleteIssue(item.id)}
              />
              <ListItemText>
                ID:[{item.id}]
                Name:[{item.content}]
              </ListItemText>
              <ListItemSecondaryAction>
                <form>
                  <Input
                    type="text"
                    name="issue"
                    value={updateissue[item.id]}
                    onChange={event => handleUpdate(event)}
                  />
                  <Button
                    type="submit"
                    onClick={() => updateIssue(item.id)}
                  >
                    更新
                  </Button>
                </form>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </React.Fragment>
  );
}
