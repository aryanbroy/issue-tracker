'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type IssuesForm = {
  title: string;
  description: string;
};

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssuesForm>();
  const router = useRouter();
  const [error, setError] = useState('');
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            // console.log(error);
            setError('Error occurred while creating new issue');
          }
        })}
        className="space-y-3"
      >
        <TextField.Root placeholder="Title" size="2" {...register('title')} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
