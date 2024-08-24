'use client';

import { Button, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import React from 'react';

interface IssuesForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))} className="max-w-xl space-y-3">
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
