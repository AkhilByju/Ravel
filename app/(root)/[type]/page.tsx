import React from 'react'
import Sort from '@/components/root/Sort';
import { getFiles } from '@/lib/actions/file.actions';
import { Models } from 'node-appwrite';
import Card from '@/components/root/Card';
import { getFileTypesParams } from '@/lib/utils';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const page = async ({ searchParams, params }: SearchParamProps) => {
    const type = (await params)?.type as string || "";
    const searchText = ((await searchParams)?.query as string) || "";
    const sort = ((await searchParams)?.sort as string) || "";

    const types = getFileTypesParams(type) as FileType[];

    const files = await getFiles({ types, searchText, sort});

  return (
    <div className='page-container'>
        <section className='w-full'>
            <h1 className='h1 capitalize bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-fuchsia-400 bg-clip-text text-transparent'>
                {type.replace(/-/g, ' ')}
            </h1>
            <div className='total-size-section pb-6'>
                <p className='body-1'>
                    Total: <span className="h5">0Mb</span>
                </p>

                <div className='sort-container'
                >
                    <p className='body-1 hidden sm:block text-white/70'>Sort by:</p>
                      <div className="w-full sm:w-auto linline-flex">
                        <Sort />
                      </div>
                </div>
            </div>
        </section>

        {/* Dynamically render the files */}
        {files.total > 0 ? (
            <section className='file-list'>
                {files.documents.map((file: Models.Document) => (
                    <Card key={file.$id} file={file}/>
                ))}
            </section>
        ): <p className='empty-list'>No Files Uploaded</p>
        }

    </div>
  )
}

export default page