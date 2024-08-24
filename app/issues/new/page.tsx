'use client';

import { Button, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type IssuesForm = {
  title: string;
  description: string;
};

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssuesForm>();
  const router = useRouter();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
        } catch (error) {
          console.log(error);
        }
      })}
      className="max-w-xl space-y-3"
    >
      <TextField.Root placeholder="Title" size="2" {...register('title')} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
