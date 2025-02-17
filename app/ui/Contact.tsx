export function Contact() {
    return (
        <div className='flex-1 card bg-base-100 w-96 mx-auto p-6'>
            <div className='form-control mb-3'>
                <label className='label'>
                    <span className='label-text'>Name</span>
                </label>
                <input type='text' placeholder='Your name' className='input input-bordered' />
            </div>
            <div className='form-control mb-3'>
                <label className='label'>
                    <span className='label-text'>Email</span>
                </label>
                <input type='email' placeholder='Your email' className='input input-bordered' />
            </div>
            <div className='form-control mb-4'>
                <label className='label'>
                    <span className='label-text'>Message</span>
                </label>
                <textarea className='textarea textarea-bordered' placeholder='Your message'></textarea>
            </div>
            <button className='btn btn-neutral w-full'>Send Message</button>
        </div>
    );
}

