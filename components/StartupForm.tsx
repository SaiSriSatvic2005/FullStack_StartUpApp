"use client"
import React, { useActionState, useState } from 'react';

// import { toast } from '@/components/ui/sonner'
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

const StartupForm = () => {
    const [errors,setErrors]=useState<Record<string,string>>({});
    const [pitch,setPitch] = useState("");
    const {toast} = useToast();
    const router = useRouter();
    const handleFormSubmit = async (prevState: any,formData:FormData) => {
        try{
            const formValues = {
                title: formData.get("title") as string,
                description : formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }
            await formSchema.parseAsync(formValues);
            console.log(formValues)
            // const result = await createIdea(prevState, formData, pitch);
            // console.log(result)
            // if (result.status == 'SUCCESS'){
            //     toast({
            //         title : "SUCCESS",
            //         discription : 'Your startup pitch has been created successfully',
            // });
            // router.push(`/startup/${result.id}`)
            // }
            // return result;
        }catch(error){
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string,string>);
                toast({
                    title : "Error",
                    discription : "Please check your inputs and try again",
                    variant : "Destructive"
                })
                return{...prevState, error:'validation failed', status:"ERROR"};
            }
            toast({
                    title : "Error",
                    discription : 'An unexpected error has occured',
                    variant : "Destructive"
            });
            return{
                ...prevState,
                error: 'An unexpected error has occured',
                status: 'ERROR',
            }
        }

    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit,{ error: "",status: "INITIAL"});


  return (
    <form action={formAction} className='startup-form'>
        <div> 
            <label htmlFor='title' className='startup-form_label'>
                <b>Title</b>
            </label>
            <Input 
                id = 'title'
                name = 'title'
                className = 'startup-form_input'
                required
                placeholder="Your Startup Title"
            />
            {errors.title && <p className='startup-form_error'>{errors.title}</p>}
        </div>
        {/* Description */}
        <div> 
            <label htmlFor='DESCRIPTION' className='startup-form_label'>
                <b>DESCRIPTION</b>
            </label>
            <Textarea 
                id = 'description'
                name = 'description'
                className = 'startup-form_textarea'
                required
                placeholder="Your Startup Description"
            />
            {errors.description && <p className='startup-form_error'>{errors.description}</p>}
        </div>
        {/* category */}
        <div> 
            <label htmlFor='category' className='startup-form_label'>
               <b>CATEGORY</b>
            </label>
            <Input 
                id = 'category'
                name = 'category'
                className = 'startup-form_input'
                required
                placeholder="Your Startup Category (Tech, Health, Educational...)"
            />
            {errors.category && <p className='startup-form_error'>{errors.category}</p>}
        </div>
        {/* link */}
        <div> 
            <label htmlFor='link' className='startup-form_label'>
                <b>Image Url</b>
            </label>
            <Input 
                id = 'link'
                name = 'link'
                className = 'startup-form_input'
                required
                placeholder="Your Startup Image URL"
            />
            {errors.link && <p className='startup-form_error'>{errors.link}</p>}
        </div>
        {/* pitch */}
        <div data-colour-mode = "light"> 
            <label htmlFor='pitch' className='startup-form_label'>
                <b>pitch</b>
            </label>
             <MDEditor
                value={pitch}
                onChange={(value) => setPitch(value as string)}
                id = "pitch"
                preview='edit'
                height={400}
                style={{borderRadius:20,overflow:"hidden"}}
                textareaProps={{
                    placeholder: "describe your idea and what problem it solves"
                }}
                previewOptions={{
                    disallowedElements:["style"]
                }}
            />
            {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
        </div>
        <Button type="submit" className='startup-form_btn text-white' disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className='size-6 ml-2'/>
        </Button>
    </form>
    
  )
}

export default StartupForm