import React from 'react';
import MarkdownView from 'react-showdown';

export default function Reader({content}: {content: string}) {
    return (
        <div id="Reader" className="col-md-6 p-4">
            <div className="p-4 h-100 overflow-auto rounded shadow">
                <MarkdownView
                    markdown={content}
                    options={{ tables: true, emoji: true, tasklists: true }}
                />
            </div>
        </div>
    )
}
