import React from 'react'

const AddSubjectForm = () => {
    return (
        <div>
            <form>
                <label>
                    Subject-Code:
                    <input type="text" name="code" />
                </label>
                <label>
                    Subject-Name:
                    <input type="text" name="name" />
                </label>
                <input type="submit" value="Add Subject" />
            </form>
        </div>
    )
}

export default AddSubjectForm
